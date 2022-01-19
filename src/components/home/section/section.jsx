import React from "react";
// import { useState } from 'react';
import { SectionStyle } from "./section";

import {
  Button,
  Avatar,
  Carousel,
  Tabs,
  Menu,
  Dropdown,
  List,
  Space,
  Skeleton,
  Card,
  Divider,
  Image
} from "antd";
import {
  MessageOutlined,
  HeartFilled,
  StarOutlined,
  ThunderboltFilled,
  HeartTwoTone,
  EyeTwoTone,
  FireTwoTone
} from "@ant-design/icons";

const { TabPane } = Tabs;
const { Meta } = Card;

// const onChangeCardSk = (checked) => {
//   this.setState({ loading: !checked });
// };

const Section = () => {
  const menu = (
    <Menu>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          按热度排序
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          按最新排序
        </a>
      </Menu.Item>
    </Menu>
  );

  const operations = (
    <Dropdown overlay={menu} placement="bottomLeft" arrow>
      <Button>排序</Button>
    </Dropdown>
  );

  // function onChange(a, b, c) {
  //   console.log(a, b, c);
  // }
  function callback(key) {
    console.log(key);
  }

  // let loading = true;

  const listData = [];
  for (let i = 0; i < 6; i++) {
    listData.push({
      href: "",
      title: `ant design part ${i}`,
      avatar: "https://joeschmoe.io/api/v1/random",
      description:
        "Ant Design, a design language for background applications, is refined by Ant UED Team."
    });
  }

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  return (
    <SectionStyle>
      <section className="section">
        <div className="left-aside">
          <div className="carousel">
            {/* afterChange={onChange} */}

            <Carousel autoplay effect="fade">
              <div>
                <img
                  className="carouse-image"
                  src={require("../../../assets/carousel1.webp")}
                />
              </div>
              <div>
                <img
                  className="carouse-image"
                  src={require("../../../assets/carousel1.webp")}
                />
              </div>
              <div>
                <img
                  className="carouse-image"
                  src={require("../../../assets/carousel1.webp")}
                />
              </div>
              <div>
                <img
                  className="carouse-image"
                  src={require("../../../assets/carousel1.webp")}
                />
              </div>
            </Carousel>
          </div>
          <div className="main">
            <div className="main-header">
              <div className="tab-flex">
                <Tabs onChange={callback} tabBarExtraContent={operations}>
                  <TabPane tab="推荐" key="1"></TabPane>
                  <TabPane tab="前端" key="2"></TabPane>
                  <TabPane tab="后端" key="3"></TabPane>
                  <TabPane tab="Android" key="4"></TabPane>
                  <TabPane tab="iOS" key="5"></TabPane>
                  <TabPane tab="人工智能" key="6"></TabPane>
                  <TabPane tab="开发工具" key="7"></TabPane>
                  <TabPane tab="代码人生" key="8"></TabPane>
                  <TabPane tab="阅读" key="9"></TabPane>
                </Tabs>
              </div>
              <div className="main-body">
                <List
                  itemLayout="vertical"
                  size="large"
                  pagination={{
                    onChange: (page) => {
                      console.log(page);
                    },
                    pageSize: 5
                  }}
                  dataSource={listData}
                  renderItem={(item) => (
                    <List.Item
                      key={item.title}
                      actions={[
                        <IconText
                          icon={StarOutlined}
                          text="156"
                          key="list-vertical-star-o"
                        />,
                        <IconText
                          icon={HeartFilled}
                          text="156"
                          key="list-vertical-like-o"
                        />,
                        <IconText
                          icon={MessageOutlined}
                          text="2"
                          key="list-vertical-message"
                        />
                      ]}
                    >
                      <List.Item.Meta
                        avatar={<Avatar src={item.avatar} />}
                        title={<a href={item.href}>{item.title}</a>}
                        description={item.description}
                      />
                    </List.Item>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="right-aside">
          <Card
            className="right-aside-card"
            actions={[<text key="enter">进入主页</text>]}
            hoverable="true"
          >
            <Skeleton loading={false} avatar active>
              <Meta
                avatar={
                  <Avatar src={require("../../../assets/personalAvatar.jpg")} />
                }
                title="Smooth"
                description="一名SCAU大二前端er"
              />
              <Divider />
              <Space size={15}>
                <HeartTwoTone className="iconNum" />
                获得点赞： 144
              </Space>
              <br />
              <Space size={14}>
                <EyeTwoTone className="iconNum" />
                文章被阅读： 3023
              </Space>
              <Space size={14}>
                <FireTwoTone className="iconNum" />
                潜力值：225
              </Space>
            </Skeleton>
          </Card>

          <Card
            className="right-aside-card"
            hoverable="true"
            actions={[
              <Button
                type="primary"
                shape="round"
                icon={<ThunderboltFilled />}
                size="large"
                key="daily"
              >
                签到
              </Button>
            ]}
          >
            <Skeleton loading={false} avatar active>
              <Meta
                avatar={
                  <Avatar
                    src={
                      <Image
                        src={require("../../../assets/personalAvatar.jpg")}
                        style={{ width: 32 }}
                      />
                    }
                  />
                }
                title="上午好！"
                description="点亮你在社区的每一天"
              />
            </Skeleton>
          </Card>
          <Card
            hoverable
            style={{ width: 295 }}
            cover={
              <img
                alt="example"
                src={require("../../../assets/carousel1.webp")}
              />
            }
          >
            {/* <Meta title="Europe Street beat" description="www.instagram.com" /> */}
          </Card>
        </div>
      </section>
    </SectionStyle>
  );
};

export default Section;
