import React, { useState, useEffect } from "react";
import { ProfileStyle } from "./profile";
import {
  Card,
  Form,
  Input,
  Button,
  Upload,
  message,
  Space,
  Tooltip
} from "antd";
import { LoadingOutlined, PlusOutlined, EditOutlined } from "@ant-design/icons";
import { set_user_info, set_user_avatar } from "../../../../service/user";

const SettingProfile = () => {
  // 表单操作
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [avatar_url, setAvatar_url] = useState("");
  const [disable, setDisable] = useState(true);
  let userInfo = JSON.parse(localStorage.getItem("userInfo"));
  // 表单初始化
  const initialForm = {
    username: userInfo.username,
    phone: userInfo.phone,
    position: userInfo.position,
    introduction: userInfo.introduction
  };

  // 用户信息改变时进行初始化
  useEffect(() => {
    setUsername(userInfo.username);
    setPhone(userInfo.phone);
    setPosition(userInfo.position);
    setIntroduction(userInfo.introduction);
    setAvatar_url(userInfo.avatar_url);
  }, []);

  const onValuesChange = (item) => {
    Object.keys(item).forEach((key) => {
      switch (key) {
        case "username":
          setUsername(item[key]);
          break;
        case "phone":
          setPhone(item[key]);
          break;
        case "position":
          setPosition(item[key]);
          break;
        case "introduction":
          setIntroduction(item[key]);
          break;
      }
    });
  };

  function beforeUpload(file) {
    const isJpgOrPng =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/jpg";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG/JPEG file!");
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error("Image must smaller than 5MB!");
    }
    return isJpgOrPng && isLt5M;
  }

  // 上传头像操作
  const [loading, setLoading] = useState(false);
  // const [image]
  const uploadButton = (
    <div>{loading ? <LoadingOutlined /> : <PlusOutlined />}</div>
  );

  // 保存修改
  const [signLoading, setSignLoading] = useState(false);
  const key = "updatable";
  async function saveChange() {
    setSignLoading(true);
    message.loading({ content: "请耐心等待", key });
    try {
      await set_user_info({
        username: username,
        phone: phone,
        position: position,
        introduction: introduction,
        avatar_url: avatar_url
      });

      // 本地用户信息做更改，触发最上面的初始化函数
      userInfo.username = username;
      userInfo.phone = phone;
      userInfo.position = position;
      userInfo.introduction = introduction;
      userInfo.avatar_url = avatar_url;
      localStorage.setItem("userInfo", JSON.stringify(userInfo));

      setTimeout(() => {
        setSignLoading(false);
        message.success("保存成功");
      }, 1000);
    } catch (err) {
      setSignLoading(false);
      message.info("请确保消息填写完整或更换用户名");
    }
  }

  const props = {
    name: "avatar",
    beforeUpload: beforeUpload,
    customRequest: (info) => {
      //手动上传
      async function uploadImage() {
        const formData = new FormData();
        formData.append("file", info.file); //名字和后端接口名字对应
        const res = await set_user_avatar(formData);
        setAvatar_url("http://loaf.youlan-lan.xyz" + res.data.data.path);
        userInfo.avatar_url = "http://loaf.youlan-lan.xyz" + res.data.data.path;
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        setLoading(false);
      }
      uploadImage();
    },
    listType: "picture-card",
    className: "avatar-uploader",
    showUploadList: false,
    maxCount: 1
  };

  return (
    <ProfileStyle>
      <Card className="profile" title={<span className="title">个人资料</span>}>
        <div className="body">
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
            <Form.Item label="用户名" name="username">
              <Input placeholder="请输入用户名" disabled={disable} />
            </Form.Item>
            <Form.Item label="手机" name="phone">
              <Input placeholder="请输入手机" disabled={disable} />
            </Form.Item>
            <Form.Item label="职位" name="position">
              <Input placeholder="请输入职位" disabled={disable} />
            </Form.Item>
            <Form.Item label="个人介绍" name="introduction">
              <Input.TextArea placeholder="请输入个人介绍" disabled={disable} />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Space size="large">
                <Button
                  loading={signLoading}
                  type="primary"
                  htmlType="submit"
                  onClick={saveChange}
                  disabled={disable}
                >
                  保存修改
                </Button>
                <Tooltip title="切换编辑状态">
                  <EditOutlined
                    style={{ transform: "scale(1.5)" }}
                    onClick={() => {
                      setDisable(!disable);
                    }}
                  />
                </Tooltip>
              </Space>
            </Form.Item>
          </Form>
          <Space className="right" direction="vertical">
            <Upload {...props}>
              {avatar_url ? (
                <img
                  src={avatar_url}
                  alt="avatar"
                  style={{ width: "100%", height: "100%" }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
            <p className="ps2">点击头像可再次上传</p>
            <span className="ps">支持jpg、png、jpeg格式大小5M以内的图片</span>
          </Space>
        </div>
      </Card>
    </ProfileStyle>
  );
};

export default SettingProfile;
