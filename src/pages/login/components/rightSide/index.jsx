import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { RightSideStyle } from "./style";
import { user_register, user_login } from "../../../../service/login";

const RightSide = () => {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onValuesChange = (item) => {
    Object.keys(item).forEach((key) => {
      switch (key) {
        case "用户名":
          setUsername(item[key]);
          break;
        case "手机号":
          setPhone(item[key]);
          break;
        case "密码":
          setPassword(item[key]);
          break;
      }
    });
  };

  async function Submit() {
    const reg_tel = /^1[0-9]{10}$/;
    setIsLoading(true);
    try {
      if (isRegister) {
        // 注册
        if (!username) {
          setTimeout(() => {
            setIsLoading(false);
            message.error("请填写您的用户名！");
          }, 1000);
          return false;
        }

        if (!password) {
          setTimeout(() => {
            setIsLoading(false);
            message.error("请填写您的密码！");
          }, 1000);
          return false;
        }

        if (!phone) {
          setTimeout(() => {
            setIsLoading(false);
            message.error("请填写您的手机号码！");
          }, 1000);
          return false;
        }
        if (!reg_tel.test(phone)) {
          setTimeout(() => {
            setIsLoading(false);
            message.error("请正确填写您的手机号码！");
          }, 1000);
          return false;
        }
        // 格式正确，允许注册
        await user_register({
          username,
          phone,
          password,
          role: 0
        });
        setTimeout(() => {
          message.success("注册成功！正在跳转登录页面...");
          setIsLoading(false);
          setIsRegister(false);
        }, 1000);
      } else {
        // 登录
        if (!phone || !password) {
          return false;
        }
        // 格式正确，允许登录
        setIsLoading(true);
        const res = await user_login({
          phone,
          password
        });
        if (res?.data) {
          const {
            access_token,
            id,
            username: username2,
            password: password2,
            phone: phone2,
            avatar_url,
            position,
            theme_color,
            introduction,
            font_size,
            dark_mode
          } = res.data;
          const userInfo = {
            id,
            username: username2,
            password: password2,
            phone: phone2,
            avatar_url,
            position,
            theme_color,
            introduction,
            font_size,
            dark_mode
          };
          if (userInfo) {
            localStorage.setItem("userInfo", JSON.stringify(userInfo)); // 本地设置缓存
          }
          if (access_token) {
            localStorage.setItem("token", JSON.stringify(access_token)); // 设置token
          }
        }

        setTimeout(() => {
          message.success("登录成功！正在跳转主页...");
          setIsLoading(false);
          navigate("/");
        }, 1000);
      }
    } catch (err) {
      message.error("账号密码错误");
      setIsLoading(false);
    }
  }

  return (
    <RightSideStyle>
      <div className="rightSide">
        <img
          className="logo"
          src={require("../../../../assets/LOGO.png")}
          alt=""
        />
        <h1 className="ps">{isRegister ? "账号注册" : "账号登录"}</h1>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true
          }}
          onValuesChange={onValuesChange}
        >
          {isRegister && (
            <Form.Item
              name="用户名"
              rules={[
                {
                  required: true,
                  message: "请输入您的用户名!"
                }
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="请输入您的用户名"
              />
            </Form.Item>
          )}

          <Form.Item
            name="手机号"
            rules={[
              {
                required: true,
                message: "请输入您的手机号!"
              }
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="请输入您的手机号"
            />
          </Form.Item>

          <Form.Item
            name="密码"
            rules={[
              {
                required: true,
                message: "请输入您的密码!"
              }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="请输入密码"
            />
          </Form.Item>
          <Form.Item>
            <Button
              loading={isLoading}
              type="primary"
              htmlType="submit"
              className="login-form-button"
              onClick={() => Submit()}
            >
              {isRegister ? "注册" : "登录"}
            </Button>
            <a
              href=""
              onClick={(e) => {
                e.preventDefault();
                setIsRegister(!isRegister);
              }}
            >
              {!isRegister ? "没有账号？现在去注册" : "已有账号，立即登录"}
            </a>
          </Form.Item>
        </Form>
        <h3 className="footer">摸鱼学社</h3>
      </div>
    </RightSideStyle>
  );
};

export default RightSide;
