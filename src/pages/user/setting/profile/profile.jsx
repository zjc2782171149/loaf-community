import React, { useState } from "react";
import { ProfileStyle } from "./profile";
import { Card, Form, Input, Button, Upload, message, Space } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

const SettingProfile = () => {
  // 表单操作
  const [username, setUsername] = useState("");

  const [position, setPosition] = useState("");
  const [introduction, setIntroduction] = useState("");

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

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }

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
  const [imageUrl, setImageUrl] = useState(false);
  const uploadButton = (
    <div>{loading ? <LoadingOutlined /> : <PlusOutlined />}</div>
  );
  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);

      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(
        info.file.originFileObj,
        (imageUrl) => (setLoading(false), setImageUrl(imageUrl))
      );
    }
  };

  // 保存修改
  const [signLoading, setSignLoading] = useState(false);
  const key = "updatable";
  const saveChange = () => {
    setSignLoading(true);
    message.loading({ content: "请耐心等待", key });
    setTimeout(() => {
      setSignLoading(false);
      message.success({ content: "保存成功!", key, duration: 2 });
    }, 1000);
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
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            onValuesChange={onValuesChange}
            autoComplete="off"
            size="large"
          >
            <Form.Item label="用户名" name="用户名">
              <Input />
            </Form.Item>

            <Form.Item label="职位" name="职位">
              <Input />
            </Form.Item>
            <Form.Item label="个人介绍" name="个人介绍">
              <Input.TextArea />
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
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
              onChange={handleChange}
              maxCount={1}
            >
              {imageUrl ? (
                <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
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
