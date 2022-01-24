import React, { useState } from "react";
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
const Account = () => {
  const [theme_color, setTheme_color] = useState("");
  const [isModalVisible1, setIsModalVisible1] = useState(false); //控制气泡确认框--手机
  const [isModalVisible2, setIsModalVisible2] = useState(false); //控制气泡确认框--密码
  const [phone, setPhone] = useState(null); // 手机
  const [password, setPassword] = useState(""); // 密码

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

  const menu = (
    <Menu>
      <Menu.Item key="0" onClick={() => selectColor("红色")}>
        <p>红色</p>
      </Menu.Item>
      <Menu.Item key="1" onClick={() => selectColor("蓝色")}>
        <p>蓝色</p>
      </Menu.Item>
      <Menu.Item key="2" onClick={() => selectColor("紫色")}>
        <p>紫色</p>
      </Menu.Item>
    </Menu>
  );
  const selectColor = (e) => {
    console.log(e);
    setTheme_color(e);
  };
  function onChange(checked) {
    console.log(`switch to ${checked}`);
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
          {name === "暗黑模式" && <Switch defaultChecked onChange={onChange} />}
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
    }
  ];

  // 保存修改
  const saveChange = () => {
    console.log("保存成功");
    setTimeout(() => {
      message.success("保存成功");
    }, 1000);
  };

  return (
    <AccountStyle>
      <Card
        className="account"
        title={
          <Space className="title">
            账号设置
            <Button type="primary" className="button" onClick={saveChange}>
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

      <Modal
        title="Basic Modal"
        visible={isModalVisible1}
        onOk={handleOk1}
        onCancel={handleCancel1}
      >
        <Input placeholder="请输手机" value={phone} onChange={phoneChange} />
      </Modal>
      <Modal
        title="Basic Modal"
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
    </AccountStyle>
  );
};

export default Account;
