import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HeaderStyle } from "./header";
import { get_user_info } from "../../service/user";
import {
  Input,
  Button,
  Avatar,
  Tabs,
  Menu,
  Dropdown,
  Badge,
  Image
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
  const [isShow, setIsShow] = useState(true);
  const [active, setActive] = useState();
  const [value, setValue] = useState(""); // 搜索有关动作
  const [menuKey, setMenuKey] = useState([]);
  const navigate = useNavigate();
  let show = true;
  //点击下拉菜单选项
  function handleMenuClick(item) {
    console.log(item);
    setMenuKey([item.key]);
    switch (item.key) {
      case "2":
        navigate("/draftBox");
        console.log("选中草稿箱");
        break;
      case "7":
        navigate("/subscribe");
        console.log("选中标签管理");
        break;
    }
  }
  const menu = (
    <Menu onClick={() => handleMenuClick()}>
      <Menu.Item key="newMessage">查看新消息</Menu.Item>
      <Menu.Item key="newRemind">查看新提醒</Menu.Item>
    </Menu>
  );
  const menuAvatar = (
    <Menu onClick={() => handleMenuClick()} openKeys={menuKey}>
      <Menu.Item key="1" icon={<EditFilled />}>
        写文章
      </Menu.Item>
      <Menu.Item key="2" icon={<FileTextFilled />}>
        草稿箱
      </Menu.Item>
      <Menu.Item
        key="3"
        icon={<UserOutlined />}
        onClick={() => turntoPersonal()}
      >
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
      <Menu.Item key="8" icon={<SettingFilled />}>
        设置
      </Menu.Item>
      <Menu.Item key="9" icon={<QuestionCircleFilled />}>
        关于
      </Menu.Item>
      <Menu.Item key="10" icon={<ExportOutlined />}>
        退出
      </Menu.Item>
    </Menu>
  );
  function tabsChange(key) {
    setActive(key);
    switch (key) {
      case "home":
        navigate("/");
        break;
      case "leetCode":
        navigate("/leetCode");
        break;
      case "fish":
        navigate("/fish");
        break;
      case "other":
        turntoPersonal();
    }
  }

  function turntoPersonal() {
    navigate("/user" + "/1/profile");
  }

  function onSearch(inputValue) {
    setValue(inputValue);
    console.log(value);
  }

  // 路由守卫，没登录就跳到登录页面，登录了就获取用户信息
  useEffect(() => {
    async function getUserInfo() {
      if (document.cookie.indexOf("token") === -1) {
        // 说明cookie过期，浏览器自动删除了，此时跳转到登录页面
        localStorage.removeItem("token"); // 本地存储中的token不会过期，得手动删除
        navigate("/login");
      } else {
        if (location.href.split("/")[3] === "login") return; // 登录页面，不用请求数据
        try {
          const res = await get_user_info();
          const {
            id,
            username,
            password,
            phone,
            avatar_url,
            position,
            theme_color,
            introduction,
            font_size,
            dark_mode
          } = res.data;
          const userInfo = {
            id,
            username,
            password,
            phone,
            avatar_url,
            position,
            theme_color,
            introduction,
            font_size,
            dark_mode
          };
          console.log(userInfo);
          localStorage.setItem("userInfo", JSON.stringify(userInfo)); // 本地设置缓存
        } catch (err) {
          console.log(err);
        }
      }
    }
    getUserInfo();
  }, [navigate]);

  // 初始化;
  useEffect(() => {
    let urlArray = location.href.split("/");
    console.log(urlArray[3]);
    if (
      urlArray[3].length === 0 ||
      urlArray[3] === "leetCode" ||
      urlArray[3] === "fish"
    ) {
      setIsShow(true);
      // 如果是首页或力扣专区或唠嗑圈
      if (urlArray[3].length === 0) {
        setActive("home");
      } else {
        setActive(urlArray[3]);
      }
    } else if (urlArray[3] === "login") {
      setIsShow(false);
    } else {
      setIsShow(true);
      // 其他的比如个人主页啥的别的页面，那就activeKey设置为其他就行
      setActive("other");
    }
  }, []);

  return (
    <HeaderStyle style={isShow ? {} : { display: "none" }}>
      <div className="header">
        <div className="left">
          <img className="image" src={require("../../assets/LOGO.png")} />
          <p className="textt">摸鱼学社</p>
          <Tabs
            onChange={tabsChange}
            size="large"
            className="header-tabs"
            activeKey={active}
          >
            <TabPane tab="首页" key="home"></TabPane>
            <TabPane tab="力扣专区" key="leetCode"></TabPane>
            <TabPane tab="唠嗑圈" key="fish"></TabPane>
            <TabPane tab="其他" key="other"></TabPane>
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
                  src="https://joeschmoe.io/api/v1/random"
                  style={{ width: 32 }}
                  preview={false}
                />
              }
              alt="wait"
            />
          </Dropdown>
        </div>
      </div>
    </HeaderStyle>
  );
};

export default Header;
