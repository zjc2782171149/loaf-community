import React, { useState, useEffect } from "react";
import { ProfileStyle } from "./profile";
import { Card, Form, Input, Button, Upload, message, Space } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { set_user_info, set_user_avatar } from "../../../../service/user";

const SettingProfile = () => {
  // 表单操作
  const [username, setUsername] = useState("");
  const [position, setPosition] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [avatar_url, setAvatar_url] = useState("");
  let userInfo = JSON.parse(localStorage.getItem("userInfo"));
  // 表单初始化
  const initialForm = {
    username: userInfo.username,
    position: userInfo.position,
    introduction: userInfo.introduction
  };

  // 用户信息改变时进行初始化
  useEffect(() => {
    console.log("用户信息发生变动，进行初始化");
    setUsername(userInfo.username);
    setPosition(userInfo.position);
    setIntroduction(userInfo.introduction);
    setAvatar_url(userInfo.avatar_url);
  }, []);

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onValuesChange = (item) => {
    Object.keys(item).forEach((key) => {
      switch (key) {
        case "用户名":
          setUsername(item[key]);
          break;
        case "职位":
          setPosition(item[key]);
          break;
        case "个人介绍":
          setIntroduction(item[key]);
          break;
      }
    });
    console.log(username, position, introduction);
  };

  // function getBase64(img, callback) {
  //   const reader = new FileReader();
  //   reader.addEventListener("load", () => callback(reader.result));
  //   reader.readAsDataURL(img);
  // }

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
  // const handleChange = (info) => {
  //   console.log(info);
  //   if (info.file.status === "uploading") {
  //     setLoading(true);
  //     return;
  //   }
  //   if (info.file.status === "done") {
  //     // Get this url from response in real world.
  //     getBase64(
  //       info.file.originFileObj,
  //       (avatar_url) => (setLoading(false), setAvatar_url(avatar_url))
  //     );
  //   }
  // };

  // 保存修改
  const [signLoading, setSignLoading] = useState(false);
  const key = "updatable";
  async function saveChange() {
    setSignLoading(true);
    message.loading({ content: "请耐心等待", key });
    try {
      await set_user_info({
        username: username,
        phone: userInfo.phone,
        position: position,
        introduction: introduction,
        avatar_url: userInfo.avatar_url
      });

      // 本地用户信息做更改，触发最上面的初始化函数
      userInfo.username = username;
      userInfo.position = position;
      userInfo.introduction = introduction;
      userInfo.avatar_url = avatar_url;
      localStorage.setItem("userInfo", JSON.stringify(userInfo));

      setTimeout(() => {
        setSignLoading(false);
        message.success({ content: "保存成功!", key, duration: 2 });
      }, 1000);
    } catch (err) {
      setTimeout(() => {
        setSignLoading(false);
        message.error({ content: "保存失败!", key, duration: 2 });
      }, 1000);
    }
  }

  const props = {
    name: "avatar",
    // action: "http://loaf.youlan-lan.xyz/api/v1/user/avatar/upload",
    // headers: {
    //   // "Content-Type": "multipart/form-data",
    //   Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
    // },
    // withCredentials: true,
    // // data:
    beforeUpload: beforeUpload,
    // onChange(info) {
    //   const { file } = info;
    //   const { status, response } = file;
    //   console.log(status, response);
    //   setLoading(false);
    // },
    customRequest: (info) => {
      //手动上传
      async function uploadImage() {
        const formData = new FormData();
        formData.append("file", info.file); //名字和后端接口名字对应
        console.log(info.file);
        console.log(formData);
        const res = await set_user_avatar(formData);
        console.log(res);
        setAvatar_url("http://loaf.youlan-lan.xyz/api/v1" + res.data.path);
        userInfo.avatar_url =
          "http://loaf.youlan-lan.xyz/api/v1" + res.data.path;
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        setLoading(false);
      }
      uploadImage();
    },

    // onChange(info) {
    //   if (info.file.status === "uploading") {
    //     // 本地上传文件
    //     const fd = new FormData();
    //     fd.append('file', file);
    //   }
    //   if (info.file.status === "done") {
    //     console.log(info);
    //     getBase64(
    //       info.file.originFileObj,
    //       (avatar_url) => (
    //         console.log(avatar_url),
    //         setLoading(false),
    //         setAvatar_url(avatar_url)
    //       )
    //     );
    //     message.success(`${info.file.name} file uploaded successfully`);
    //   } else if (info.file.status === "error") {
    //     message.error(`${info.file.name} file upload failed.`);
    //   }
    // },
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
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            onValuesChange={onValuesChange}
            autoComplete="off"
            size="large"
            initialValues={initialForm}
          >
            <Form.Item label="用户名" name="username">
              <Input placeholder="请输入用户名" />
            </Form.Item>

            <Form.Item label="职位" name="position">
              <Input placeholder="请输入职位" />
            </Form.Item>
            <Form.Item label="个人介绍" name="introduction">
              <Input.TextArea placeholder="请输入个人介绍" />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button
                loading={signLoading}
                type="primary"
                htmlType="submit"
                onClick={saveChange}
              >
                保存修改
              </Button>
            </Form.Item>
          </Form>
          <Space className="right" direction="vertical">
            <Upload {...props}>
              {avatar_url ? (
                <img src={avatar_url} alt="avatar" style={{ width: "100%" }} />
              ) : (
                uploadButton
              )}
            </Upload>
            <p className="ps">支持jpg、png、jpeg格式大小5M以内的图片</p>
          </Space>
        </div>
      </Card>
    </ProfileStyle>
  );
};

export default SettingProfile;
