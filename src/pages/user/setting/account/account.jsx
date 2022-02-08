import React, { useEffect, useState } from "react";
import { AccountStyle } from "./account";
import {
  Card,
  Table,
  Space,
  Switch,
  Menu,
  Dropdown,
  Button,
  Modal,
  Input,
  message,
  Tooltip,
  ConfigProvider
} from "antd";
import { set_user_setting, set_user_password } from "../../../../service/user";

const Account = () => {
  const [password, setPassword] = useState(""); // 密码
  const [theme_color, setTheme_color] = useState(""); // 主题颜色
  const [font_size, setFont_size] = useState(null); // 字体大小
  const [isModalVisible2, setIsModalVisible2] = useState(false); //控制气泡确认框--密码
  const [isModalVisible3, setIsModalVisible3] = useState(false); //控制气泡确认框--字体大小
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [dark_mode, setDark_mode] = useState(userInfo.dark_mode); // 暗黑模式

  // 用户信息改变时进行初始化
  useEffect(() => {
    setPassword(userInfo.password);
    setDark_mode(userInfo.dark_mode === 1 ? true : false);
    setTheme_color(userInfo.theme_color);
    setFont_size(userInfo.font_size);
  }, []);

  const menu = (
    <Menu>
      <Menu.Item key="0" onClick={() => selectColor("#1890ff")}>
        <p>默认</p>
      </Menu.Item>
      <Menu.Item key="1" onClick={() => selectColor("#e74c3c")}>
        <p>红色</p>
      </Menu.Item>
      <Menu.Item key="2" onClick={() => selectColor("#f39c12")}>
        <p>橙色</p>
      </Menu.Item>
      <Menu.Item key="3" onClick={() => selectColor("#8470FF")}>
        <p>紫色</p>
      </Menu.Item>
      <Menu.Item key="4" onClick={() => selectColor("#FF69B4")}>
        <p>粉色</p>
      </Menu.Item>
    </Menu>
  );

  // 主题颜色
  const selectColor = (e) => {
    ConfigProvider.config({
      theme: {
        primaryColor: e
      }
    });
    setTheme_color(e);
  };

  // 暗黑模式
  function onChange(checked) {
    if (checked) {
      setDark_mode(true);
    } else {
      setDark_mode(false);
    }
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "value",
      dataIndex: "value",
      key: "value",
      render: (name) => (
        <Space size="middle">
          {name !== "暗黑模式" && name !== "主题颜色" && <p>{name}</p>}
          {name === "暗黑模式" && (
            <Tooltip title="暂不支持当前功能">
              <Switch defaultChecked={dark_mode} onChange={onChange} disabled />
            </Tooltip>
          )}
          {name === "主题颜色" && (
            <Space wrap>
              <Dropdown overlay={menu} placement="bottomLeft">
                <Button>选择主题颜色</Button>
              </Dropdown>
              {theme_color}
            </Space>
          )}
        </Space>
      )
    },
    {
      title: "edit",
      dataIndex: "edit",
      key: "edit",
      render: (text, record) => (
        <Space size="middle" className="edit" onClick={() => null}>
          {record.name === "密码" && (
            <a onClick={() => showModal2(record.name)}>
              {record.name !== "暗黑模式" &&
                record.name !== "主题颜色" &&
                "编辑"}
            </a>
          )}
          {record.name === "字体大小" && (
            <a onClick={() => showModal3(record.name)}>
              {record.name !== "暗黑模式" &&
                record.name !== "主题颜色" &&
                "编辑"}
            </a>
          )}
        </Space>
      )
    }
  ];

  const data = [
    {
      key: "2",
      name: "密码",
      value: password,
      edit: true
    },
    {
      key: "3",
      name: "暗黑模式",
      value: "暗黑模式",
      edit: false
    },
    {
      key: "4",
      name: "主题颜色",
      value: "主题颜色",
      edit: false
    },
    {
      key: "5",
      name: "字体大小",
      value: font_size,
      edit: true
    }
  ];

  // 保存修改
  const [signLoading, setSignLoading] = useState(false);
  async function saveChange() {
    setSignLoading(true);
    const requestAll = [
      set_user_setting({
        theme_color,
        dark_mode: dark_mode === true ? 1 : 0,
        font_size: Number(font_size)
      }),
      set_user_password({
        password
      })
    ];
    try {
      await Promise.all(requestAll);
      // 本地用户信息做更改，触发最上面的初始化函数
      userInfo.password = password;
      userInfo.theme_color = theme_color;
      userInfo.dark_mode = dark_mode === true ? 1 : 0;
      userInfo.font_size = font_size;
      localStorage.setItem("userInfo", JSON.stringify(userInfo));

      setTimeout(() => {
        message.success("保存成功!");
        setSignLoading(false);
      }, 1000);
    } catch (err) {
      message.error("保存失败");
      setSignLoading(false);
    }
  }

  // 密码
  const showModal2 = () => {
    setIsModalVisible2(true);
  };
  const handleOk2 = () => {
    setIsModalVisible2(false);
  };
  const handleCancel2 = () => {
    setPassword(null);
    setIsModalVisible2(false);
  };
  const passwordChange = (e) => {
    setPassword(e.target.value);
  };

  // 字体大小
  const showModal3 = () => {
    setIsModalVisible3(true);
  };
  const handleOk3 = () => {
    setIsModalVisible3(false);
  };
  const handleCancel3 = () => {
    setFont_size(null);
    setIsModalVisible3(false);
  };
  const font_sizeChange = (e) => {
    setFont_size(e.target.value);
  };

  return (
    <AccountStyle>
      <Card
        className="account"
        title={
          <Space className="title">
            账号设置
            <Button
              loading={signLoading}
              type="primary"
              className="button"
              onClick={saveChange}
            >
              保存修改
            </Button>
          </Space>
        }
      >
        <div className="body">
          <Table
            className="table"
            columns={columns}
            dataSource={data}
            showHeader={false}
            pagination={false}
          />
        </div>
      </Card>

      {/* 密码弹窗 */}
      <Modal
        title="密码"
        visible={isModalVisible2}
        onOk={handleOk2}
        onCancel={handleCancel2}
      >
        <Input
          placeholder="请输入密码"
          value={password}
          onChange={passwordChange}
        />
      </Modal>
      {/* 字体大小弹窗 */}
      <Modal
        title="字体大小"
        visible={isModalVisible3}
        onOk={handleOk3}
        onCancel={handleCancel3}
      >
        <Input
          placeholder="请输入字体大小(12 - 20)"
          value={font_size}
          onChange={font_sizeChange}
        />
      </Modal>
    </AccountStyle>
  );
};

export default Account;
