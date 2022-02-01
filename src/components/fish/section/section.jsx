import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { SectionStyle } from "./section";
import {
  Avatar,
  Space,
  Card,
  List,
  Tag,
  Input,
  Button,
  Tabs,
  Menu,
  Dropdown,
  Spin,
  message
} from "antd";
import {
  LinkOutlined,
  MessageOutlined,
  ShareAltOutlined,
  FireTwoTone,
  DollarTwoTone,
  TrophyTwoTone,
  CodepenCircleOutlined
} from "@ant-design/icons";
import {
  get_topic_all,
  get_tabs_topic_,
  add_topic
} from "../../../service/topic";
import { get_user_follow, get_user_followed } from "../../../service/user";
import { formatDate } from "../../../utils/date";
import moment from "moment";
moment.locale();

const { Meta } = Card;
const { TextArea } = Input;
const { TabPane } = Tabs;

const FishSection = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [contentList, setContentList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sendLoading, setSendLoading] = useState(false);
  const [selectTab_id, setSelectTab_id] = useState(0);
  const [textValue, setTextValue] = useState("");
  const [nowSendKind, setNowSendKind] = useState("圈子类型");
  const [nowTopic, setNowTopic] = useState("技术圈");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  // 用户相关
  useEffect(() => {
    async function initUser() {
      let topic_num = 0;
      let userNow = {
        avatar_url: userInfo.avatar_url
          ? userInfo.avatar_url
          : require("../../../assets/LoginOut.png"),
        username: userInfo.username,
        introduction: userInfo.introduction
          ? userInfo.introduction
          : "该用户很懒，暂没留下个人介绍",
        topic_num: 0,
        following_num: 0,
        followed_num: 0
      };
      async function initTopic() {
        try {
          const res = await get_topic_all();
          const data = res.data,
            len = res.data.length;
          for (let i = 0; i < len; i++) {
            // 获取每个话题分类下的详细文章
            const nameTopic = await get_tabs_topic_({ id: data[i].id });
            const topicData = nameTopic.data;
            // 遍历找找有多少篇的 user_id 跟我的id一样
            topicData.forEach((item) => {
              if (item.user_id === userInfo) topic_num++;
            });
          }
          userNow.topic_num = topic_num;
          setUser(userNow);
        } catch (err) {
          console.log(err);
        }
      }
      async function initFollow() {
        try {
          const requestArr = [get_user_follow(), get_user_followed()];
          const resArr = await Promise.all(requestArr);
          const following = resArr[0].data;
          const followed = resArr[1].data;
          userNow.following_num = following.length;
          userNow.followed_num = followed.length;
          setUser(userNow);
        } catch (err) {
          console.log(err);
        }
      }
      initTopic();
      initFollow();
    }
    initUser();
  }, []);

  // 文章相关
  useEffect(() => {
    async function initContent() {
      setLoading(true);
      try {
        const res = await get_tabs_topic_({ id: 1 });
        console.log(res.data);
        setContentList(res.data);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    }
    initContent();
  }, []);

  const menu = (
    <Menu>
      <Menu.Item key="IT" icon={<DollarTwoTone />} onClick={() => sorted("IT")}>
        技术圈
      </Menu.Item>
      <Menu.Item key="say" icon={<FireTwoTone />} onClick={() => sorted("say")}>
        吐槽圈
      </Menu.Item>
      <Menu.Item
        key="sport"
        icon={<TrophyTwoTone />}
        onClick={() => sorted("sport")}
      >
        体育圈
      </Menu.Item>
    </Menu>
  );

  const menuSend = (
    <Menu>
      <Menu.Item key="IT" onClick={() => selectKind("IT")}>
        技术圈
      </Menu.Item>
      <Menu.Item key="say" onClick={() => selectKind("say")}>
        吐槽圈
      </Menu.Item>
      <Menu.Item key="sport" onClick={() => selectKind("sport")}>
        体育圈
      </Menu.Item>
    </Menu>
  );

  const operations = (
    <Dropdown overlay={menu} placement="bottomLeft" arrow>
      <Button>{nowTopic}</Button>
    </Dropdown>
  );

  // 发送消息时选择圈子类型
  async function selectKind(key) {
    try {
      console.log(key);
      if (key === "IT") {
        // 获取每个话题分类下的详细文章
        setNowSendKind("技术圈");
        setSelectTab_id(1);
      } else if (key === "say") {
        setNowSendKind("吐槽圈");
        setSelectTab_id(2);
      } else {
        setNowSendKind("体育圈");
        setSelectTab_id(3);
      }
    } catch (err) {
      console.log(err);
    }
  }

  // 排序
  async function sorted(key) {
    try {
      console.log(key);
      if (key === "IT") {
        // 获取每个话题分类下的详细文章
        const res = await get_tabs_topic_({ id: 1 });
        setNowTopic("技术圈");
        setContentList([...res.data]);
      } else if (key === "say") {
        const res = await get_tabs_topic_({ id: 2 });
        setNowTopic("吐槽圈");
        setContentList([...res.data]);
      } else {
        const res = await get_tabs_topic_({ id: 3 });
        setNowTopic("体育圈");
        setContentList([...res.data]);
      }
    } catch (err) {
      console.log(err);
    }
  }

  // 切换热门、最新
  function tabsChange(key) {
    console.log(key, typeof key);
    let arr = [...contentList];
    if (key === "1") {
      // 热门
      arr.sort((a, b) => {
        return b.comment_count - a.comment_count;
      });
    } else {
      // 最新
      arr.sort((a, b) => {
        return b.publish_time - a.publish_time;
      });
    }
    setContentList([...arr]);
  }

  function clickHot(item) {
    console.log(item);
  }

  // 文字输入时，改变文本域的值
  function onChange(e) {
    console.log(e.target.value);
    setTextValue(e.target.value);
  }

  // 发送动态
  async function sendMessage() {
    if (!textValue) {
      message.error("输入框不能为空");
      return;
    }
    if (selectTab_id === 0) {
      message.error("圈子类型不能为空");
      return;
    }
    let flag = 0;
    setSendLoading(true);
    try {
      const res = await add_topic({
        content: textValue,
        tab_id: selectTab_id
      });
      message.success("发送唠嗑成功！");
      if (nowSendKind === "技术圈" && nowTopic === "技术圈") {
        flag = 1;
      } else if (nowSendKind === "吐槽圈" && nowTopic === "吐槽圈") {
        flag = 1;
      } else if (nowSendKind === "运动圈" && nowTopic === "运动圈") {
        flag = 1;
      }
      if (flag) {
        setContentList([
          {
            id: res.data.id,
            username: userInfo.username,
            publish_time: new Date().getTime(),
            avatar: userInfo.avatar_url
              ? userInfo.avatar_url
              : require("../../../assets/LoginOut.png"),
            content: textValue,
            comment_num: 0
          },
          ...contentList
        ]);
      }

      setTextValue("");
      setSendLoading(false);
    } catch (err) {
      console.log(err);
      setSendLoading(false);
    }
  }
  // 跳转到主页
  const turnHome = (key) => {
    console.log("跳转到主页");
    if (key === "topic") {
      navigate(`/user/${userInfo.id}/says`);
    } else if (key === "posts") {
      navigate(`/user/${userInfo.id}/posts`);
    } else {
      navigate(`/user/${userInfo.id}/follow`);
    }
  };

  // 跳转到唠嗑详情
  const turnTopicDetail = (id) => {
    console.log("跳转到唠嗑详情");
    navigate(`/topic/${id}`);
  };

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
                技术圈
              </Tag>
              <Tag color="green" className="iconNum">
                吐槽圈
              </Tag>
              <Tag color="orange" className="iconNum">
                体育圈
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
                  <Space className="smileHover">
                    <Dropdown overlay={menuSend} placement="bottomLeft" arrow>
                      <Button icon={<CodepenCircleOutlined />}>
                        {nowSendKind}
                      </Button>
                    </Dropdown>
                  </Space>

                  <Space className="smileHover">
                    <LinkOutlined />
                    链接
                  </Space>
                </Space>
                <Button
                  loading={sendLoading}
                  type="primary"
                  className="button"
                  size="middle"
                  onClick={() => sendMessage()}
                >
                  发送
                </Button>
              </div>
            </div>
          </div>
          <div className="tabs">
            <Tabs
              defaultActiveKey="1"
              onChange={tabsChange}
              tabBarExtraContent={operations}
              className="tabsTopic"
            >
              <TabPane tab="热门" key="1"></TabPane>
              <TabPane tab="最新" key="2"></TabPane>
            </Tabs>
            <Spin spinning={loading} tip="加载中，请稍后...">
              <List
                className="messageList"
                itemLayout="horizontal"
                dataSource={contentList}
                pagination={{ pageSize: 5, showQuickJumper: true }}
                renderItem={(item) => (
                  <Card
                    onClick={() => turnTopicDetail(item.id)}
                    key={item.id}
                    bordered={false}
                    actions={[
                      <Space key="1">
                        <ShareAltOutlined />
                        分享
                      </Space>,
                      <Space key="comment">
                        <MessageOutlined />
                        {item.comment_count}
                      </Space>
                    ]}
                  >
                    <Meta
                      className="topicHover"
                      avatar={
                        <Avatar
                          src={
                            item.avatar
                              ? item.avatar
                              : require("../../../assets/LoginOut.png")
                          }
                          className="avatarContent"
                        />
                      }
                      title={
                        <Space>
                          {item.username}
                          <span className="topic-time">
                            {item.publish_time
                              ? formatDate(item.publish_time)
                              : ""}
                          </span>
                        </Space>
                      }
                      description={item.content}
                    />
                  </Card>
                )}
              />
            </Spin>
          </div>
        </div>
        <div className="right-aside">
          {/* 个人信息展示 */}
          <Card
            className="right-aside-card"
            actions={[
              <Space
                direction="vertical"
                key="topic"
                onClick={() => turnHome("topic")}
              >
                <>{user.topic_num ? user.topic_num : 0}</>帖子
              </Space>,
              <Space
                direction="vertical"
                key="following"
                onClick={() => turnHome("following")}
              >
                <>{user.following_num ? user.following_num : 0}</>关注
              </Space>,
              <Space
                direction="vertical"
                key="followed"
                onClick={() => turnHome("followed")}
              >
                <>{user.followed_num ? user.followed_num : 0}</>关注者
              </Space>
            ]}
            hoverable="true"
          >
            <Meta
              onClick={() => turnHome("posts")}
              avatar={<Avatar src={user.avatar_url} />}
              title={user.username}
              description={user.introduction}
            />
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
              dataSource={contentList.slice(
                0,
                Math.random(contentList.length) * 10
              )}
              renderItem={(item, index) => (
                <List.Item
                  key={index}
                  onClick={() => {
                    clickHot(item);
                  }}
                >
                  <List.Item.Meta
                    title={item.username}
                    description={
                      <Space key="action" className="hotContent">
                        {item.content}
                      </Space>
                    }
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

export default FishSection;
