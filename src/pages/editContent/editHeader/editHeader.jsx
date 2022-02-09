import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HeaderStyle } from "./style";
import { add_essay } from "../../../service/detail";
import { add_drftbox_essay } from "../../../service/user";
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
  Form,
  Tooltip
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

const EditHeader = ({
  contentEdit,
  titleEdit,
  introductionEdit,
  tab_idEdit
}) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [value, setValue] = useState(""); // 搜索有关动作
  const [menuKey, setMenuKey] = useState([]);
  const [introduction, setIntroduction] = useState("");
  const [nowSendKind, setNowSendKind] = useState("请选择板块");
  const [selectTab_id, setSelectTab_id] = useState(0);
  const [initialForm, setInitialForm] = useState({}); // 表单初始化
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  // 初始化，主要用于从草稿箱点击编辑跳转到此
  useEffect(() => {
    setValue(titleEdit);
    setIntroduction(introductionEdit);
    setSelectTab_id(tab_idEdit);

    switch (tab_idEdit) {
      case 1:
        setNowSendKind("推荐");
        break;
      case 2:
        setNowSendKind("前端");
        break;
      case 3:
        setNowSendKind("后端");
        break;
      case 4:
        setNowSendKind("Android");
        break;
      case 5:
        setNowSendKind("IOS");
        break;
      case 6:
        setNowSendKind("人工智能");
        break;
      case 7:
        setNowSendKind("开发工具");
        break;
      case 8:
        setNowSendKind("代码人生");
        break;
      case 9:
        setNowSendKind("阅读");
        break;
      case 10:
        setNowSendKind("其他");
        break;
    }

    setInitialForm({
      introduction: introductionEdit,
      tab_id: tab_idEdit
    });
  }, [contentEdit, titleEdit, introductionEdit, tab_idEdit]);

  //点击下拉菜单选项
  function handleMenuClick(item) {
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
    if (!value) {
      message.info("标题不能为空");
      return;
    }
    if (!contentEdit) {
      message.info("文章内容不能为空");
      return;
    }
    if (!introduction) {
      message.info("文章介绍不能为空");
      return;
    }
    if (!selectTab_id) {
      message.info("板块不能为空");
      return;
    }
    try {
      await add_essay({
        title: value,
        content: contentEdit,
        introduction,
        tab_id: selectTab_id
      });
      message.success("发布文章成功");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      message.success("发布文章失败");
    }
  }

  // 表单数据改变时反馈
  const onValuesChange = (item) => {
    Object.keys(item).forEach((key) => {
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

  // 去草稿箱
  async function toDraftBox() {
    if (!value || !contentEdit) {
      message.info("标题或文章内容不可为空");
      return;
    }

    try {
      if (id) {
        // 如果没参数，说明是旧草稿
        message.success("文章已保存至草稿箱");
      } else {
        // 如果路由中没参数，说明不是从草稿箱跳转过来的，是新文章
        await add_drftbox_essay({
          title: value ?? "草稿",
          content: contentEdit ?? "请填写文章主要内容",
          introduction: introduction ?? "请填写文章介绍",
          tab_id: selectTab_id ? selectTab_id : 1
        });
        message.success("文章已新增至草稿箱");
      }

      setTimeout(() => {
        navigate("/draftBox");
      }, 2000);
    } catch (err) {
      console.log(err);
      message.info("异常情况，请稍后再试");
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
            value={value}
          />
        </div>
        <div className="right">
          <Space className="button">
            <Tooltip title="保存草稿并跳转到草稿箱">
              <Button
                className="draftButton"
                size="middle"
                onClick={() => toDraftBox()}
              >
                草稿箱
              </Button>
            </Tooltip>

            <Button type="primary" size="middle" onClick={() => showModal()}>
              发布
            </Button>
          </Space>

          <Dropdown overlay={menuAvatar} placement="bottomCenter" arrow>
            <Avatar
              className="avatar"
              src={
                <Image
                  src={
                    userInfo.avatar_url ??
                    require("../../../assets/LoginOut.png")
                  }
                  style={{ width: 32, height: 32 }}
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
          initialValues={initialForm}
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
