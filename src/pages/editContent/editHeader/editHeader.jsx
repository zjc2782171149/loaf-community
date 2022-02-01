import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeaderStyle } from "./style";
import { add_essay } from "../../../service/detail";
import {
  Input,
  Button,
  Avatar,
  Menu,
  Dropdown,
  Image,
  Space,
  message,
  Modal,
  Form
} from "antd";
import {
  UserOutlined,
  HeartFilled,
  EditFilled,
  FileTextFilled,
  StarFilled,
  EyeFilled,
  TagsFilled,
  SettingFilled,
  QuestionCircleFilled,
  ExportOutlined,
  CodepenCircleOutlined
} from "@ant-design/icons";

const EditHeader = ({ content }) => {
  const navigate = useNavigate();
  const [value, setValue] = useState(""); // 搜索有关动作
  const [menuKey, setMenuKey] = useState([]);
  const [introduction, setIntroduction] = useState("");
  const [nowSendKind, setNowSendKind] = useState("请选择板块");
  const [selectTab_id, setSelectTab_id] = useState(0);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  //点击下拉菜单选项
  function handleMenuClick(item) {
    console.log(item);
    setMenuKey([item.key]);
    switch (item.key) {
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
        break;
      case "10":
        localStorage.removeItem("userInfo");
        localStorage.removeItem("token");
        message.success("退出登录成功");
        navigate("/login");
        break;
    }
  }

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

  function titleChange(e) {
    setValue(e.target.value);
  }

  // 弹窗设置
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    // 点击确认才发布文章
    handleSubmit();
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  async function handleSubmit() {
    console.log(value, content, introduction, selectTab_id);
    try {
      await add_essay({
        title: value,
        content,
        introduction,
        tab_id: selectTab_id
      });
      message.success("发布文章成功");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      console.log(err);
      message.success("发布文章失败");
    }
  }

  // 表单数据改变时反馈
  const onValuesChange = (item) => {
    Object.keys(item).forEach((key) => {
      console.log(key, item[key]);
      switch (key) {
        case "introduction":
          setIntroduction(item[key]);
          break;
      }
    });
  };

  // 选择板块菜单
  const menuSend = (
    <Menu>
      <Menu.Item key="1" onClick={() => selectKind("推荐")}>
        推荐
      </Menu.Item>
      <Menu.Item key="2" onClick={() => selectKind("前端")}>
        前端
      </Menu.Item>
      <Menu.Item key="3" onClick={() => selectKind("后端")}>
        后端
      </Menu.Item>
      <Menu.Item key="4" onClick={() => selectKind("Android")}>
        Android
      </Menu.Item>
      <Menu.Item key="5" onClick={() => selectKind("IOS")}>
        IOS
      </Menu.Item>
      <Menu.Item key="6" onClick={() => selectKind("人工智能")}>
        人工智能
      </Menu.Item>
      <Menu.Item key="7" onClick={() => selectKind("开发工具")}>
        开发工具
      </Menu.Item>
      <Menu.Item key="8" onClick={() => selectKind("代码人生")}>
        代码人生
      </Menu.Item>
      <Menu.Item key="9" onClick={() => selectKind("阅读")}>
        阅读
      </Menu.Item>
      <Menu.Item key="10" onClick={() => selectKind("其他")}>
        其他
      </Menu.Item>
    </Menu>
  );

  // 发送消息时选择圈子类型
  async function selectKind(key) {
    console.log(key);
    switch (key) {
      case "推荐":
        setNowSendKind("推荐");
        setSelectTab_id(1);
        break;
      case "前端":
        setNowSendKind("前端");
        setSelectTab_id(2);
        break;
      case "后端":
        setNowSendKind("后端");
        setSelectTab_id(3);
        break;
      case "Android":
        setNowSendKind("Android");
        setSelectTab_id(4);
        break;
      case "IOS":
        setNowSendKind("IOS");
        setSelectTab_id(5);
        break;
      case "人工智能":
        setNowSendKind("人工智能");
        setSelectTab_id(6);
        break;
      case "开发工具":
        setNowSendKind("开发工具");
        setSelectTab_id(7);
        break;
      case "代码人生":
        setNowSendKind("代码人生");
        setSelectTab_id(8);
        break;
      case "阅读":
        setNowSendKind("阅读");
        setSelectTab_id(9);
        break;
      case "其他":
        setNowSendKind("其他");
        setSelectTab_id(10);
        break;
    }
  }

  return (
    <HeaderStyle>
      <div className="header">
        <div className="left">
          <Input
            className="input"
            bordered={false}
            placeholder="输入文章标题..."
            onChange={titleChange}
          />
        </div>
        <div className="right">
          <Space className="button">
            <Button className="draftButton" size="middle">
              草稿箱
            </Button>
            <Button type="primary" size="middle" onClick={() => showModal()}>
              发布
            </Button>
          </Space>

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
      <Modal
        title="发布文章"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          className="form"
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onValuesChange={onValuesChange}
          autoComplete="off"
          size="large"
        >
          <Form.Item label="文章介绍" name="introduction">
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="请选择文章所属板块" name="tab_id">
            <Dropdown overlay={menuSend} placement="bottomLeft" arrow>
              <Button icon={<CodepenCircleOutlined />}>{nowSendKind}</Button>
            </Dropdown>
          </Form.Item>
        </Form>
      </Modal>
    </HeaderStyle>
  );
};

export default EditHeader;
