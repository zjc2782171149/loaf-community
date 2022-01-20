import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeaderStyle } from "./header";
// import { useState } from 'react';
import {
  Image,
  Input,
  Button,
  Avatar,
  Tabs,
  Menu,
  Dropdown,
  Badge,
  Divider
} from "antd";
import {
  BellOutlined,
  UserOutlined,
  HeartFilled,
  EditFilled,
  FileTextFilled,
  StarFilled,
  EyeFilled,
  TagsFilled,
  SettingFilled,
  QuestionCircleFilled,
  ExportOutlined
} from "@ant-design/icons";

const { Search } = Input;
const { TabPane } = Tabs;

const Header = () => {
  const [active, setActive] = useState();
  const navigate = useNavigate();
  let show = true;
  function handleMenuClick(index) {
    console.log(index);
  }
  const menu = (
    <Menu>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          查看新消息
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          查看新提醒
        </a>
      </Menu.Item>
    </Menu>
  );
  const menuAvatar = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1" icon={<EditFilled />}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          写文章
        </a>
      </Menu.Item>
      <Menu.Item key="2" icon={<FileTextFilled />}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          草稿箱
        </a>
      </Menu.Item>
      <Divider />
      <Menu.Item key="3" icon={<UserOutlined />}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          我的主页
        </a>
      </Menu.Item>
      <Menu.Item key="4" icon={<HeartFilled />}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          我赞过的
        </a>
      </Menu.Item>
      <Menu.Item key="5" icon={<StarFilled />}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          我的收藏
        </a>
      </Menu.Item>
      <Menu.Item key="6" icon={<EyeFilled />}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          浏览记录
        </a>
      </Menu.Item>
      <Menu.Item key="7" icon={<TagsFilled />}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          标签管理
        </a>
      </Menu.Item>
      <Divider />
      <Menu.Item key="8" icon={<SettingFilled />}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          设置
        </a>
      </Menu.Item>
      <Menu.Item key="9" icon={<QuestionCircleFilled />}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          关于
        </a>
      </Menu.Item>
      <Divider />
      <Menu.Item key="10" icon={<ExportOutlined />}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          退出
        </a>
      </Menu.Item>
    </Menu>
  );
  function tabsChange(key) {
    setActive(key);
    switch (key) {
      case "1":
        navigate("/");
        break;
      case "2":
        navigate("/leetCode");
        break;
      case "3":
        navigate("/fish");
        break;
    }
  }

  function onSearch(e) {
    console.log(e.target.value);
  }

  return (
    <HeaderStyle>
      <div className="header">
        <div className="left">
          <img className="image" src={require("../../assets/logo.webp")} />
          <div></div>
          <p className="text">摸鱼学社</p>
          <Tabs
            onChange={tabsChange}
            size="large"
            className="header-tabs"
            activeKey={active}
          >
            <TabPane tab="首页" key="1"></TabPane>
            <TabPane tab="力扣专区" key="2"></TabPane>
            <TabPane tab="摸鱼圈" key="3"></TabPane>
          </Tabs>
        </div>
        <div className="right">
          <Search
            className="search"
            placeholder="搜索摸鱼社区"
            onSearch={onSearch}
          />
          <Button className="button" type="primary">
            发帖
          </Button>
          <Badge count={show ? 100 : 0} overflowCount={99} className="badge" />
          <Dropdown overlay={menu} placement="bottomCenter" arrow>
            <BellOutlined className="bell" />
          </Dropdown>
          <Dropdown overlay={menuAvatar} placement="bottomCenter" arrow>
            <Avatar
              className="avatar"
              src={
                <Image
                  src={require("../../assets/personalAvatar.jpg")}
                  style={{ width: 32 }}
                />
              }
            />
          </Dropdown>
        </div>
      </div>
    </HeaderStyle>
  );
};

export default Header;
