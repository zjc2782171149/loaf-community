import React, { useState, useEffect } from "react";
import { SectionStyle } from "./section";

import {
  Avatar,
  Space,
  Skeleton,
  Card,
  List,
  Tag,
  Input,
  Button,
  Tabs,
  Row,
  Col,
  Modal
} from "antd";
import {
  SmileOutlined,
  LinkOutlined,
  MessageOutlined,
  LikeOutlined,
  ShareAltOutlined
} from "@ant-design/icons";

const { Meta } = Card;
const { TextArea } = Input;
const { TabPane } = Tabs;

const FishSection = () => {
  let loading = false;
  const [user, setUser] = useState({});
  const [contentList, setContentList] = useState([]);

  // 用户相关
  useEffect(() => {
    setUser({
      avatar_url: require("../../../assets/personalAvatar.jpg"),
      username: "Smooth",
      introduction: "一名SCAU大二前端er",
      topic_num: 1,
      follow: 122,
      beiFollow: 30
    });
  }, []);

  function callback(key) {
    console.log(key);
  }

  function clickHot(item) {
    console.log(item);
  }

  // 发帖相关，表情
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [textValue, setTextValue] = useState("");
  // 展示弹窗
  const showModal = () => {
    setIsModalVisible(true);
  };

  // 点击表情时将表情添加，并关闭弹窗，或点击ok时关闭弹窗
  const handleOk = (item) => {
    console.log(item);
    setTextValue(textValue + item); // 将表情加到文本域内
    setIsModalVisible(false);
  };

  // 点击取消时
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // 文字输入时，改变文本域的值
  function onChange(e) {
    console.log(e.target.value);
    setTextValue(e.target.value);
  }

  // 发送动态
  function sendMessage() {
    let date = new Date();
    let year = date.getFullYear(); // 2022年
    let month = date.getMonth() + 1; // 多少月份
    let day = date.getDate(); // 几号
    console.log(year, month, day);
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }

    setContentList([
      {
        id: 1,
        title: (
          <>
            Smooth
            <p className="publish-time">{year + "-" + month + "-" + day}</p>
          </>
        ),
        avatar: require("../../../assets/personalAvatar.jpg"),
        description: textValue,
        comment_num: 0
      },
      ...contentList
    ]);
    setTextValue("");
  }

  // 自定义测试列表
  const emojiList = [
    {
      id: 1,
      emoji: "😀"
    },
    {
      id: 2,
      emoji: "😍"
    },
    {
      id: 3,
      emoji: "😅"
    },
    {
      id: 4,
      emoji: "😘"
    },
    {
      id: 5,
      emoji: "😓"
    },
    {
      id: 6,
      emoji: "🤭"
    },
    {
      id: 7,
      emoji: "🙄"
    },
    {
      id: 8,
      emoji: "😵‍💫"
    },
    {
      id: 9,
      emoji: "🤤"
    },
    {
      id: 10,
      emoji: "🥺"
    },
    {
      id: 11,
      emoji: "💣"
    },
    {
      id: 12,
      emoji: "❤️‍🔥"
    },
    {
      id: 13,
      emoji: "🙉"
    },
    {
      id: 14,
      emoji: "😸"
    },
    {
      id: 15,
      emoji: "👨‍🦲"
    },
    {
      id: 16,
      emoji: "🍉"
    },
    {
      id: 17,
      emoji: "🐵"
    },
    {
      id: 18,
      emoji: "🐋"
    },
    {
      id: 19,
      emoji: "🍉"
    },
    {
      id: 20,
      emoji: "😴"
    },
    {
      id: 21,
      emoji: "😱"
    },
    {
      id: 22,
      emoji: "😭"
    },
    {
      id: 23,
      emoji: "😈"
    },
    {
      id: 24,
      emoji: "💩"
    },
    {
      id: 25,
      emoji: "💤"
    },
    {
      id: 26,
      emoji: "🤡"
    },
    {
      id: 27,
      emoji: "💘"
    },
    {
      id: 28,
      emoji: "💥"
    },
    {
      id: 29,
      emoji: "😰"
    },
    {
      id: 30,
      emoji: "😑"
    },
    {
      id: 31,
      emoji: "😝"
    },
    {
      id: 32,
      emoji: "😉"
    },
    {
      id: 33,
      emoji: "🙃"
    },
    {
      id: 34,
      emoji: "😒"
    },
    {
      id: 35,
      emoji: "🥶"
    },
    {
      id: 36,
      emoji: "🥵"
    }
  ];

  return (
    <SectionStyle>
      <section className="section">
        <div className="left-aside">
          <Card
            className="left-aside"
            title={<p className="left-title">涉及板块</p>}
          >
            <Space direction="vertical" size="large">
              <Tag color="magenta" className="iconNum">
                新闻
              </Tag>
              <Tag color="red" className="iconNum">
                体育
              </Tag>
              <Tag color="volcano" className="iconNum">
                娱乐圈
              </Tag>
              <Tag color="orange" className="iconNum">
                电竞圈
              </Tag>
              <Tag color="gold" className="iconNum">
                IT圈
              </Tag>
              <Tag color="lime" className="iconNum">
                元宇宙圈
              </Tag>
              <Tag color="green" className="iconNum">
                吃瓜圈
              </Tag>
            </Space>
          </Card>
        </div>
        <div className="middle-aside">
          <div className="main">
            <div className="main-body">
              <div className="sendMessage">
                <TextArea
                  className="textarea"
                  value={textValue}
                  onChange={onChange}
                  maxLength={100}
                  allowClear="true"
                  rows={4}
                  placeholder="快和鱼友一起分享生活中的趣事来一起唠嗑吧！"
                />

                <Space size="large">
                  <Space className="smileHover" onClick={showModal}>
                    <SmileOutlined />
                    表情
                  </Space>

                  <Space className="smileHover">
                    <LinkOutlined />
                    链接
                  </Space>
                </Space>
                <Button
                  type="primary"
                  className="button"
                  size="middle"
                  onClick={sendMessage}
                >
                  发送
                </Button>
              </div>
            </div>
          </div>
          <div className="tabs">
            <Tabs defaultActiveKey="1" onChange={callback}>
              <TabPane tab="热门" key="1"></TabPane>
              <TabPane tab="最新" key="2"></TabPane>
            </Tabs>
            <List
              className="messageList"
              itemLayout="horizontal"
              dataSource={contentList}
              pagination={{ pageSize: 5, showQuickJumper: true }}
              renderItem={(item) => (
                <Card
                  bordered={false}
                  actions={[
                    <Space key="1">
                      <ShareAltOutlined />
                      分享
                    </Space>,
                    <Space key="comment">
                      <MessageOutlined />
                      {item.comment_num}
                    </Space>
                  ]}
                  key={item.description}
                >
                  <Skeleton loading={false} avatar active>
                    <Meta
                      avatar={<Avatar src={item.avatar} />}
                      title={item.title}
                      description={item.description}
                    />
                  </Skeleton>
                </Card>
              )}
            />
          </div>
        </div>
        <div className="right-aside">
          {/* 个人信息展示 */}
          <Card
            className="right-aside-card"
            actions={[
              <Space direction="vertical" key="enter">
                <>{user.topic_num}</>帖子
              </Space>,
              <Space direction="vertical" key="follow">
                <>{user.follow}</>关注
              </Space>,
              <Space direction="vertical" key="follower">
                <>{user.beiFollow}</>关注者
              </Space>
            ]}
            hoverable="true"
          >
            <Skeleton loading={loading} avatar active>
              <Meta
                avatar={<Avatar src={user.avatar_url} />}
                title={user.username}
                description={user.introduction}
              />
            </Skeleton>
          </Card>

          {/* 热门唠嗑 */}
          <Card
            className="right-aside-card"
            title={"热门唠嗑"}
            hoverable="true"
          >
            <List
              className="hotList"
              itemLayout="horizontal"
              dataSource={contentList.slice(0, 3)}
              renderItem={(item) => (
                <List.Item
                  key={item.title}
                  onClick={() => {
                    clickHot(item);
                  }}
                  extra={
                    <img
                      width={75}
                      height={75}
                      alt="logo"
                      src={require("../../../assets/carousel1.webp")}
                    />
                  }
                >
                  <List.Item.Meta
                    title={
                      <Space key="action">
                        <LikeOutlined />
                        {item.like_count}
                        <MessageOutlined />
                        {item.comment_num}
                      </Space>
                    }
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
        <Modal
          title="表情符号"
          visible={isModalVisible}
          onOk={() => handleOk("")}
          onCancel={handleCancel}
        >
          <Row gutter={5}>
            {emojiList.map((item) => {
              return (
                <Col
                  span={2}
                  onClick={() => handleOk(item.emoji)}
                  key={item.id}
                >
                  <div>{item.emoji}</div>
                </Col>
              );
            })}
          </Row>
        </Modal>
      </section>
    </SectionStyle>
  );
};

export default FishSection;
