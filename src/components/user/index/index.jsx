import React from "react";
import { SectionStyle } from "./index";
import {
  List,
  Space,
  Card,
  Skeleton,
  Image,
  Button,
  Divider,
  Tabs
} from "antd";
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

const UserSection = () => {
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

  return (
    <SectionStyle>
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
                        <Button className="editPersonal">编辑个人资料</Button>
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
            <Tabs defaultActiveKey="1" size="large" centered>
              <TabPane tab="动态" key="1">
                Tab 1
              </TabPane>
              <TabPane tab="文章" key="2">
                Tab 2
              </TabPane>
              <TabPane tab="专栏" key="3">
                Tab 3
              </TabPane>
              <TabPane tab="沸点" key="4">
                Tab 3
              </TabPane>
              <TabPane tab="赞" key="5">
                Tab 3
              </TabPane>
            </Tabs>
            <Card bordered={false}>
              <Skeleton loading={false} avatar active>
                <Space>
                  <Meta
                    avatar={
                      <Image
                        src={require("../../../assets/personalAvatar.jpg")}
                      />
                    }
                    title={<>111</>}
                  />
                </Space>
              </Skeleton>
            </Card>
          </div>
        </div>
        <div className="right-aside">
          {/* 公告栏 */}
          <Card className="right-aside-card" title="相关推荐" hoverable="true">
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
    </SectionStyle>
  );
};

export default UserSection;
