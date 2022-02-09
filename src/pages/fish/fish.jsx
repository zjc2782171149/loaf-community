import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { FishStyle, LeftSideStyle, MiddleStyle, RightSideStyle } from "./fish";
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
import Self from "./components/Self/index.jsx";
import Hot from "./components/Hot/index.jsx";
import { get_tabs_topic_, add_topic } from "../../service/topic";
import { formatDate } from "../../utils/date";
import moment from "moment";
moment.locale();

const { Meta } = Card;
const { TextArea } = Input;
const { TabPane } = Tabs;

const Fish = () => {
  const navigate = useNavigate();
  const [contentList, setContentList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sendLoading, setSendLoading] = useState(false);
  const [selectTab_id, setSelectTab_id] = useState(0);
  const [textValue, setTextValue] = useState("");
  const [nowSendKind, setNowSendKind] = useState("圈子类型");
  const [nowTopic, setNowTopic] = useState("全部");
  const [topicNum, setTopicNum] = useState(0);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  // 文章相关
  useEffect(() => {
    async function initContent() {
      setLoading(true);
      try {
        const res1 = await get_tabs_topic_({ id: 1 });
        const res2 = await get_tabs_topic_({ id: 2 });
        const res3 = await get_tabs_topic_({ id: 3 });
        setContentList([...res1.data, ...res2.data, ...res3.data]);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    }
    initContent();
  }, []);

  const menu = (
    <Menu>
      <Menu.Item key="all" onClick={() => sorted("all")}>
        全部
      </Menu.Item>
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
      if (key === "all") {
        // 获取每个话题分类下的详细文章
        const res1 = await get_tabs_topic_({ id: 1 });
        const res2 = await get_tabs_topic_({ id: 2 });
        const res3 = await get_tabs_topic_({ id: 3 });
        setNowTopic("全部");
        setContentList([...res1.data, ...res2.data, ...res3.data]);
      } else if (key === "IT") {
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

  // 文字输入时，改变文本域的值
  function onChange(e) {
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
      setTopicNum(topicNum + 1);
      if (nowTopic === "全部") {
        flag = 1;
      } else if (nowSendKind === "技术圈" && nowTopic === "技术圈") {
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
            avatar_url:
              userInfo.avatar_url ?? require("../../assets/LoginOut.png"),
            content: textValue,
            comment_num: 0
          },
          ...contentList
        ]);
      }

      setTextValue("");
      setSendLoading(false);
    } catch (err) {
      setSendLoading(false);
    }
  }

  // 跳转到唠嗑详情
  const turnTopicDetail = (id) => {
    navigate(`/topic/${id}`);
  };

  return (
    <FishStyle>
      <section className="fish">
        <LeftSideStyle>
          <div className="left-aside">
            <Card title={<p className="left-title">涉及板块</p>}>
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
        </LeftSideStyle>

        <MiddleStyle>
          <div className="middle-aside">
            <div className="main">
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
                              item.avatar_url ??
                              require("../../assets/LoginOut.png")
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
        </MiddleStyle>
        <RightSideStyle>
          <div className="right-aside">
            {/* 个人信息展示 */}
            <Self topicNum={topicNum} />

            {/* 热门唠嗑 */}
            <Hot contentList={contentList} />

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
        </RightSideStyle>
      </section>
    </FishStyle>
  );
};

export default Fish;
