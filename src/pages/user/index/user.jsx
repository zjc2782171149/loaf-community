import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { UserStyle } from "./user";
import Profile from "../profile/profile.jsx";
import Posts from "../posts/posts.jsx";
import Says from "../says/says.jsx";
import Likes from "../likes/likes.jsx";
import Follow from "../follow/follow.jsx";
import Self from "../components/Self/index.jsx";
import YearlyReport from "../components/YearlyReport/index.jsx";
import { Space, Card, Image, Button, Divider, Tabs } from "antd";
import {
  WeiboCircleOutlined,
  GithubOutlined,
  GoogleOutlined,
  ContactsFilled,
  IdcardFilled
} from "@ant-design/icons";

const { Meta } = Card;
const { TabPane } = Tabs;

const PersonalHome = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  let userInfo = JSON.parse(localStorage.getItem("userInfo"));

  // 跳转到对应组件
  const [activeKey, setActiveKey] = useState(location.href.split("/")[5]);
  const tabsChange = (key) => {
    navigate(`/user/${userInfo.id}/${key}`);
    setActiveKey(key);
  };

  const toSetting = () => {
    navigate(`/user/setting/profile`);
  };

  // 初始化，根据url改变，第一种是通过header来改变，第二种是进到个人主页后点击tabs来改变
  useEffect(() => {
    if (location.href.split("/")[5]) {
      setActiveKey(location.href.split("/")[5]);
    }
  }, [location.href]);

  return (
    <UserStyle>
      <div className="user">
        <section className="section">
          <div className="left-aside">
            <div className="main">
              <div className="main-header">
                <div className="main-body">
                  {/* 话题详情 */}
                  <Card bordered={false}>
                    <Space>
                      <Image
                        className="image"
                        width={100}
                        height={100}
                        src={
                          userInfo.avatar_url ??
                          require("../../../assets/LoginOut.png")
                        }
                      />
                      <Space direction="vertical">
                        <Space>
                          <span className="username">{userInfo.username}</span>
                          <Space className="icon" size="middle">
                            <WeiboCircleOutlined />
                            <GithubOutlined />
                            <GoogleOutlined />
                          </Space>
                        </Space>
                        <Space className="position">
                          <ContactsFilled />
                          {userInfo.position
                            ? userInfo.position
                            : "未填写职位"}{" "}
                          | {userInfo.phone ? userInfo.phone : "未填写手机"}
                        </Space>
                        <Space className="introduction">
                          <IdcardFilled />
                          {userInfo.introduction
                            ? userInfo.introduction
                            : "该用户很懒，暂没留下个人介绍"}
                          <Button
                            className="editPersonal"
                            onClick={() => {
                              toSetting();
                            }}
                          >
                            编辑个人资料
                          </Button>
                        </Space>
                      </Space>
                    </Space>
                    <Divider />
                  </Card>
                </div>
              </div>
            </div>

            <div
              className="send animate__animated animate__fadeIn"
              style={visible ? { display: "none" } : {}}
            >
              <Tabs
                size="large"
                centered
                onChange={tabsChange}
                activeKey={activeKey}
              >
                <TabPane tab="我的文章" key="posts"></TabPane>
                <TabPane tab="我的点赞" key="likes"></TabPane>
                <TabPane tab="我的收藏" key="profile"></TabPane>
                <TabPane tab="我的唠嗑" key="says"></TabPane>
                <TabPane tab="我的关注" key="follow"></TabPane>
              </Tabs>
              {activeKey === "profile" && <Profile />}
              {activeKey === "posts" && <Posts />}
              {activeKey === "says" && <Says />}
              {activeKey === "likes" && <Likes />}
              {activeKey === "follow" && <Follow />}
            </div>

            {/* 年度报告弹窗 */}
            <div
              className="yearly animate__animated animate__zoomIn"
              style={!visible ? { display: "none" } : {}}
            >
              <YearlyReport />
            </div>
          </div>
          <div className="right-aside">
            {/* 公告栏 */}
            <Self />

            {/* 照片/广告 */}
            <Card
              onClick={() => {
                setVisible(!visible);
              }}
              className="right-aside-card"
              hoverable="true"
              cover={
                <img alt="example" src={require("../../../assets/left.jpg")} />
              }
            >
              <Meta title="年度报告" description="快点击我查收你的年度报告" />
            </Card>
          </div>
        </section>
      </div>
    </UserStyle>
  );
};

export default PersonalHome;
