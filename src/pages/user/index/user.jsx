import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { UserStyle } from "./user";
import Profile from "../profile/profile.jsx";
import Posts from "../posts/posts.jsx";
import Says from "../says/says.jsx";
import Likes from "../likes/likes.jsx";
import { List, Space, Card, Image, Button, Divider, Tabs } from "antd";
// Avatar, Button
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
  const announcementList = [
    {
      title: "【好题分享活动】开奖啦~",
      description: "2022/01/17"
    },
    {
      title: "【笔记创作活动】已开启，超值礼品等…",
      description: "2022/01/17"
    },
    {
      title: "青训营社区|意见&建议反馈收集",
      description: "2022/01/15"
    },
    {
      title: "关于我们(bug生产队)",
      description: "2022/02/10"
    }
  ];

  const [activeKey, setActiveKey] = useState("profile");
  const tabsChange = (key) => {
    navigate(`/user/1/${key}`);
    setActiveKey(key);
  };

  const toSetting = () => {
    navigate(`/user/setting/profile`);
  };

  // 初始化
  useEffect(() => {
    if (location.href.split("/")[5]) {
      setActiveKey(location.href.split("/")[5]);
    }
  }, []);

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
                        src={require("../../../assets/personalAvatar.jpg")}
                      />
                      <Space direction="vertical">
                        <Space>
                          <span className="username">Smoothzjc</span>
                          <Space className="icon" size="middle">
                            <WeiboCircleOutlined />
                            <GithubOutlined />
                            <GoogleOutlined />
                          </Space>
                        </Space>
                        <Space className="position">
                          <ContactsFilled />
                          前端工程师 | 学生 | 华南农业大学
                        </Space>
                        <Space className="introduction">
                          <IdcardFilled />
                          一名SCAU大二学生，现沉迷于前端领域学习
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
            {/* 发表评论 */}
            <div className="send">
              <Tabs
                size="large"
                centered
                onChange={tabsChange}
                activeKey={activeKey}
              >
                <TabPane tab="动态" key="profile"></TabPane>
                <TabPane tab="我的文章" key="posts"></TabPane>
                <TabPane tab="我的唠嗑" key="says"></TabPane>
                <TabPane tab="我的点赞" key="likes"></TabPane>
                {/* <TabPane tab="我的关注" key="follow"></TabPane> */}
              </Tabs>
              {activeKey === "profile" && <Profile />}
              {activeKey === "posts" && <Posts />}
              {activeKey === "says" && <Says />}
              {activeKey === "likes" && <Likes />}
              {/* {activeKey === "follow" && <Likes />} */}
            </div>
          </div>
          <div className="right-aside">
            {/* 公告栏 */}
            <Card
              className="right-aside-card"
              title="相关推荐"
              hoverable="true"
            >
              <List
                className="content-list"
                loadMore={true}
                itemLayout="horizontal"
                dataSource={announcementList}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      title={<a href="">{item.title}</a>}
                      description={item.description}
                    />
                  </List.Item>
                )}
              />
            </Card>

            {/* 照片/广告 */}
            <Card
              className="right-aside-card"
              hoverable="true"
              cover={
                <img alt="example" src="https://joeschmoe.io/api/v1/random" />
              }
            >
              <Meta title="广告位招租" description="有需要的可以来找我们哈哈" />
            </Card>
          </div>
        </section>
      </div>
    </UserStyle>
  );
};

export default PersonalHome;
