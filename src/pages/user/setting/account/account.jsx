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
  message
} from "antd";
import {
  set_user_info,
  set_user_setting,
  set_user_password
} from "../../../../service/user";

const Account = () => {
  const [phone, setPhone] = useState(null); // 手机
  const [password, setPassword] = useState(""); // 密码
  const [dark_mode, setDark_mode] = useState(""); // 暗黑模式
  const [theme_color, setTheme_color] = useState(""); // 主题颜色
  const [font_size, setFont_size] = useState(null); // 字体大小
  const [isModalVisible1, setIsModalVisible1] = useState(false); //控制气泡确认框--手机
  const [isModalVisible2, setIsModalVisible2] = useState(false); //控制气泡确认框--密码
  const [isModalVisible3, setIsModalVisible3] = useState(false); //控制气泡确认框--字体大小
  let userInfo = JSON.parse(localStorage.getItem("userInfo"));

  // 用户信息改变时进行初始化
  useEffect(() => {
    console.log("用户信息发生变动，进行初始化");
    setPhone(userInfo.phone);
    setPassword(userInfo.password);
    setDark_mode(userInfo.dark_mode);
    setTheme_color(userInfo.theme_color);
    setFont_size(userInfo.font_size);
  }, []);

  const menu = (
    <Menu>
      <Menu.Item key="0" onClick={() => selectColor("#e74c3c")}>
        <p>红色</p>
      </Menu.Item>
      <Menu.Item key="1" onClick={() => selectColor("#3498db")}>
        <p>蓝色</p>
      </Menu.Item>
      <Menu.Item key="2" onClick={() => selectColor("#9b59b6")}>
        <p>紫色</p>
      </Menu.Item>
    </Menu>
  );

  // 主题颜色
  const selectColor = (e) => {
    console.log(e);
    setTheme_color(e);
  };

  // 暗黑模式
  function onChange(checked) {
    console.log(`switch to ${checked}`);
    if (checked) {
      setDark_mode(1);
    } else {
      setDark_mode(0);
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
          {name !== "暗黑模式" && name !== "主体颜色" && <p>{name}</p>}
          {name === "暗黑模式" && (
            <Switch defaultChecked={dark_mode} onChange={onChange} />
          )}
          {name === "主体颜色" && (
            <Space wrap>
              <Dropdown overlay={menu} placement="bottomLeft">
                <Button>选择主体颜色</Button>
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
          {record.name === "手机" && (
            <a onClick={() => showModal1(record.name)}>
              {record.name !== "暗黑模式" &&
                record.name !== "主体颜色" &&
                "编辑"}
            </a>
          )}
          {record.name === "密码" && (
            <a onClick={() => showModal2(record.name)}>
              {record.name !== "暗黑模式" &&
                record.name !== "主体颜色" &&
                "编辑"}
            </a>
          )}
          {record.name === "字体大小" && (
            <a onClick={() => showModal3(record.name)}>
              {record.name !== "暗黑模式" &&
                record.name !== "主体颜色" &&
                "编辑"}
            </a>
          )}
        </Space>
      )
    }
  ];

  const data = [
    {
      key: "1",
      name: "手机",
      value: phone,
      edit: true
    },
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
      name: "主体颜色",
      value: "主体颜色",
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
  const key = "updatable";
  async function saveChange() {
    setSignLoading(true);
    message.loading({ content: "请耐心等待", key });
    console.log(
      {
        username: userInfo.username,
        phone,
        position: userInfo.position,
        introduction: userInfo.introduction,
        avatar_url: userInfo.avatar_url
      },
      {
        theme_color,
        dark_mode,
        font_size
      }
    );
    const requestAll = [
      set_user_info({
        username: userInfo.username,
        phone,
        position: userInfo.position,
        introduction: userInfo.introduction,
        avatar_url: userInfo.avatar_url
      }),
      set_user_setting({
        theme_color,
        dark_mode,
        font_size
      }),
      set_user_password({
        password
      })
    ];
    try {
      await Promise.all(requestAll);
      // 本地用户信息做更改，触发最上面的初始化函数
      userInfo.phone = phone;
      userInfo.password = password;
      userInfo.theme_color = theme_color;
      userInfo.dark_mode = dark_mode;
      userInfo.font_size = font_size;
      localStorage.setItem("userInfo", JSON.stringify(userInfo));

      setTimeout(() => {
        setSignLoading(false);
        message.success({ content: "保存成功!", key, duration: 2 });
      }, 1000);
    } catch (err) {
      console.log(err);
      message.error({ content: "保存失败!", key, duration: 2 });
    }
  }

  // 手机
  const showModal1 = () => {
    setIsModalVisible1(true);
  };
  const handleOk1 = () => {
    setIsModalVisible1(false);
  };
  const handleCancel1 = () => {
    setPhone(null);
    setIsModalVisible1(false);
  };
  const phoneChange = (e) => {
    setPhone(e.target.value);
  };

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

      {/* 手机弹窗 */}
      <Modal
        title="手机"
        visible={isModalVisible1}
        onOk={handleOk1}
        onCancel={handleCancel1}
      >
        <Input placeholder="请输手机" value={phone} onChange={phoneChange} />
      </Modal>
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