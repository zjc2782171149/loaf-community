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
  Image,
  Modal,
  Space,
  message,
  ConfigProvider
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
import { colorGrey } from "../../reducer/constant";

const { Search } = Input;
const { TabPane } = Tabs;

const Header = () => {
  const navigate = useNavigate();
  const [isShow, setIsShow] = useState(true);
  const [active, setActive] = useState();
  // const [value, setValue] = useState(""); // 搜索有关动作
  const [menuKey, setMenuKey] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    if (
      location.href.split("/")[3] === "" ||
      location.href.split("/")[3] === "login"
    ) {
      ConfigProvider.config({
        theme: {
          primaryColor: "#1890ff"
        }
      });
    } else {
      ConfigProvider.config({
        theme: {
          // 默认背景色为 #F4F5F5
          primaryColor: colorGrey === "#F4F5F5" ? "#1890ff" : colorGrey
        }
      });
    }
  }, [localStorage]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  //点击下拉菜单选项
  function handleMenuClick(item) {
    setMenuKey([item.key]);
    switch (item.key) {
      case "1":
        navigate("/editContent");
        break;
      case "2":
        navigate("/draftBox");
        break;
      case "3":
        navigate(`/user/${userInfo.id}/posts`);
        break;
      case "4":
        navigate(`/user/${userInfo.id}/likes`);
        break;
      case "5":
        navigate(`/user/${userInfo.id}/profile`);
        break;
      case "6":
        navigate(`/user/${userInfo.id}/follow`);
        break;
      case "7":
        navigate("/subscribe");
        break;
      case "8":
        navigate("/user/setting/profile");
        break;
      case "9":
        showModal();
        break;
      case "10":
        localStorage.removeItem("userInfo");
        localStorage.removeItem("token");
        message.success("退出登录成功");
        navigate("/login");
        break;
    }
  }

  const menu = (
    <Menu onClick={() => null}>
      <Menu.Item key="newMessage">查看新消息</Menu.Item>
      <Menu.Item key="newRemind">查看新提醒</Menu.Item>
    </Menu>
  );
  const menuAvatar = (
    <Menu onClick={handleMenuClick} openKeys={menuKey}>
      <Menu.Item key="1" icon={<EditFilled />}>
        写文章
      </Menu.Item>
      <Menu.Item key="2" icon={<FileTextFilled />}>
        草稿箱
      </Menu.Item>
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
        我的关注
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
        navigate(`/user/${userInfo.id}/posts`);
    }
  }

  // function onSearch(inputValue) {
  //   setValue(inputValue);
  // }

  // 路由守卫，没登录就跳到登录页面，登录了就获取用户信息
  useEffect(() => {
    async function getUserInfo() {
      if (location.href.split("/")[3] === "login") return; // 登录页面，不用请求数据
      try {
        // 用于自动登录，返回数据跟login成功是一样的，更新数据
        let userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const res = await get_user_info({ id: userInfo.id });
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
        userInfo = {
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
        localStorage.setItem("userInfo", JSON.stringify(userInfo)); // 本地设置缓存
      } catch (err) {
        // 后端返回的不是401状态码，而是设置成了我无法访问直接报401错，所以我只能通过catch err 捕获异常得知token过期
        console.log("token失效，返回登录页面");
        localStorage.removeItem("token"); // 本地存储中的token不会过期，得手动删除
        localStorage.removeItem("userInfo"); // 本地存储中的token不会过期，得手动删除
        navigate("/login");
      }
    }
    getUserInfo();
  }, [navigate]);

  // 页头激活标签初始化;
  useEffect(() => {
    let urlArray = location.href.split("/");
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
    } else if (urlArray[3] === "editContent") {
      setIsShow(false);
    } else {
      setIsShow(true);
      // 其他的比如个人主页啥的别的页面，那就activeKey设置为其他就行
      setActive("other");
    }
  }, [location.href]);

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
            // onSearch={onSearch}
          />
          <Button
            className="button"
            type="primary"
            onClick={() => {
              navigate("/editContent");
            }}
          >
            发文
          </Button>
          <Badge count={0} overflowCount={99} className="badge" />
          <Dropdown overlay={menu} placement="bottomCenter" arrow>
            <BellOutlined className="bell" />
          </Dropdown>
          <Dropdown overlay={menuAvatar} placement="bottomCenter" arrow>
            <Avatar
              className="avatar"
              src={
                <Image
                  src={
                    userInfo?.avatar_url ?? require("../../assets/LoginOut.png")
                  }
                  style={{ width: 32, height: 32 }}
                  preview={false}
                />
              }
              alt="wait"
            />
          </Dropdown>
        </div>
        <Modal
          title="关于我们"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Space direction="vertical">
            <span className="modalTitle">Bug生产队</span>
            <span>
              灵感来源于程序员在工作中经常会做的一件事哈哈，bug可谓是贯穿了我们的职业生涯，可以说是对它又爱又恨，当然，遇到
              bug时我们第一时间便是进行Debug，思考这个bug是如何产生的，经过一系列搜索引擎，如果还没得到很好的解决，我们会及时记录并反馈，让大家一同来解决。
            </span>
            <spann className="modalFooter">
              目标：致力于打造一个信息覆盖面广、体验良好、找到家一般的功能社区网站
            </spann>
          </Space>
        </Modal>
      </div>
    </HeaderStyle>
  );
};

export default Header;
