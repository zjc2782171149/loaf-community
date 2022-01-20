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
  const [value, setValue] = useState(""); // 搜索有关动作
  const navigate = useNavigate();
  let show = true;
  function handleMenuClick(index) {
    console.log(index);
  }
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="newMessage">查看新消息</Menu.Item>
      <Menu.Item key="newRemind">查看新提醒</Menu.Item>
    </Menu>
  );
  const menuAvatar = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1" icon={<EditFilled />}>
        写文章
      </Menu.Item>
      <Menu.Item key="2" icon={<FileTextFilled />}>
        草稿箱
      </Menu.Item>
      <Divider />
      <Menu.Item key="3" icon={<UserOutlined />}>
        我的主页
      </Menu.Item>
      <Menu.Item key="4" icon={<HeartFilled />}>
        我赞过的
      </Menu.Item>
      <Menu.Item key="5" icon={<StarFilled />}>
        我的收藏
      </Menu.Item>
      <Menu.Item key="6" icon={<EyeFilled />}>
        浏览记录
      </Menu.Item>
      <Menu.Item key="7" icon={<TagsFilled />}>
        标签管理
      </Menu.Item>
      <Divider />
      <Menu.Item key="8" icon={<SettingFilled />}>
        设置
      </Menu.Item>
      <Menu.Item key="9" icon={<QuestionCircleFilled />}>
        关于
      </Menu.Item>
      <Divider />
      <Menu.Item key="10" icon={<ExportOutlined />}>
        退出
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

  function onSearch(inputValue) {
    setValue(inputValue);
    console.log(value);
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
