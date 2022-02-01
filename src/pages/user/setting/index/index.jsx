import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { SettingStyle } from "./index";
import Resume from "../resume/resume.jsx";
import SettingProfile from "../profile/profile.jsx";
import Account from "../account/account.jsx";
import { PageHeader, Menu, Space } from "antd";
import {
  IdcardOutlined,
  SettingOutlined,
  FileTextOutlined
} from "@ant-design/icons";

const PersonalSetting = () => {
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = useState("profile");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const tabsChange = (item) => {
    console.log(item.key);
    setActiveKey(item.key);
    navigate(`/user/setting/${item.key}`);
  };

  const backPersonalHome = () => {
    navigate(`/user/${userInfo.id}/posts`);
  };

  // activeKey 初始化
  useEffect(() => {
    if (location.href.split("/")[5]) {
      console.log(location.href.split("/")[5]);
      setActiveKey(location.href.split("/")[5]);
    }
  }, []);

  return (
    <SettingStyle>
      <div className="setting">
        <div className="main">
          <div className="header">
            <PageHeader
              className="site-page-header"
              onBack={() => backPersonalHome()}
              title="返回个人主页"
            />
          </div>
          <div className="body">
            <div className="left">
              <Menu
                mode="inline"
                style={{ width: 256 }}
                onClick={tabsChange}
                defaultSelectedKeys={[activeKey]}
              >
                <Menu.Item key="profile">
                  <Space>
                    <IdcardOutlined />
                    个人资料
                  </Space>
                </Menu.Item>
                <Menu.Item key="account">
                  <Space>
                    <SettingOutlined />
                    账号设置
                  </Space>
                </Menu.Item>
                <Menu.Item key="resume">
                  <Space>
                    <FileTextOutlined />
                    简历管理
                  </Space>
                </Menu.Item>
              </Menu>
            </div>
            <div className="right">
              {activeKey === "profile" ? <SettingProfile /> : <></>}
              {activeKey === "account" ? <Account /> : <></>}
              {activeKey === "resume" ? <Resume /> : <></>}
            </div>
          </div>
        </div>
      </div>
    </SettingStyle>
  );
};

export default PersonalSetting;
