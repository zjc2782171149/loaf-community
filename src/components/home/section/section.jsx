import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import SectionCarousel from "../carousel/carousel.jsx";
import { SectionStyle } from "./section";
import { get_essay_all } from "../../../service/essay";

import {
  Button,
  Avatar,
  Tabs,
  Menu,
  Dropdown,
  List,
  Space,
  Skeleton,
  Card,
  Divider,
  Image,
  Popover,
  message,
  Spin
} from "antd";
import {
  MessageOutlined,
  StarOutlined,
  LikeOutlined,
  EyeOutlined,
  LikeTwoTone,
  StarTwoTone,
  ThunderboltFilled,
  HeartTwoTone,
  EyeTwoTone,
  FireTwoTone,
  DashboardTwoTone,
  CheckCircleFilled
} from "@ant-design/icons";

const { TabPane } = Tabs;
const { Meta } = Card;

// const onChangeCardSk = (checked) => {
//   this.setState({ loading: !checked });
// };

const Section = () => {
  // const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [essayList, setEssayList] = useState([]);
  let loading = false;
  const menu = (
    <Menu>
      <Menu.Item key="hot" icon={<FireTwoTone />}>
        按热度排序
      </Menu.Item>
      <Menu.Item key="new" icon={<DashboardTwoTone />}>
        按最新排序
      </Menu.Item>
    </Menu>
  );

  const operations = (
    <Dropdown overlay={menu} placement="bottomLeft" arrow>
      <Button>排序</Button>
    </Dropdown>
  );

  function callback(key) {
    console.log(key);
    // switch (key) {
    //   case "推荐":
    //     setEssayList(recommend_essay);
    //     break;
    //   case "前端":
    //     setEssayList(front_essay);
    //     break;
    //   case "后端":
    //     setEssayList(after_essay);
    //     break;
    //   case "Android":
    //     setEssayList(Android_essay);
    //     break;
    //   case "iOS":
    //     setEssayList(iOS_essay);
    //     break;
    //   case "人工智能":
    //     setEssayList(personalIntelligence_essay);
    //     break;
    //   case "开发工具":
    //     setEssayList(tool_essay);
    //     break;
    //   case "代码人生":
    //     setEssayList(code_essay);
    //     break;
    //   case "阅读":
    //     setEssayList(read_essay);
    //     break;
    //   case "其他":
    //     setEssayList(other_essay);
    //     break;
    //   default:
    //     setEssayList([]);
    // }
  }

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  const announcementList = [
    {
      title: "【好题分享活动】开奖啦~",
      description: "2022-01-17"
    },
    {
      title: "【笔记创作活动】已开启，超值礼品等…",
      description: "2022-01-17"
    },
    {
      title: "青训营社区|意见&建议反馈收集",
      description: "2022-01-15"
    },
    {
      title: "关于我们(bug生产队)",
      description: "2022-02-10"
    }
  ];

  // 每日签到
  const [signLoading, setSignLoading] = useState(false);
  const key = "updatable";
  const dailySign = () => {
    setSignLoading(true);
    message.loading({ content: "请耐心等待", key });
    setTimeout(() => {
      setSignLoading(false);
      message.success({ content: "恭喜您，签到成功!", key, duration: 2 });
    }, 1000);
  };

  // 文章的列表相关
  useEffect(() => {
    async function getEssayAll() {
      try {
        const res = await get_essay_all();
        const recommend_essay = res.data;
        setEssayList(recommend_essay);
      } catch (err) {
        console.log(err);
      }
    }
    getEssayAll();
  }, []);

  // 用户相关
  useEffect(() => {
    setUser({
      avatar_url: require("../../../assets/personalAvatar.jpg"),
      username: "Smooth",
      introduction: "一名SCAU大二前端er",
      user_like_count: 456,
      user_visit_count: 23452,
      user_potential_count: 1233,
      sign: false
    });
  }, []);

  // 跳转到文章详情
  const turntoEssayDetail = (id) => {
    console.log("跳转到动态详情");
    navigate(`/essay/${id}`);
  };

  // 改变文章点赞状态
  const changeLike = (id, bool) => {
    console.log(id, bool);
    essayList.forEach((item) => {
      if (item.id === id) {
        // 找到这篇文章了
        if (bool) {
          // 点赞
          item.is_like = true;
          item.like_count++;
        } else {
          // 取消点赞
          item.is_like = false;
          item.like_count--;
        }
      }
    });

    setEssayList([...essayList]);
  };

  // 改变文章收藏状态
  const changeCollect = (id, bool) => {
    console.log(id, bool);
    essayList.forEach((item) => {
      if (item.id === id) {
        // 找到这篇文章了
        if (bool) {
          // 点赞
          item.is_collect = true;
          item.collect_count++;
        } else {
          // 取消点赞
          item.is_collect = false;
          item.collect_count--;
        }
      }
    });
    setEssayList([...essayList]);
  };

  return (
    <SectionStyle>
      <section className="section">
        <div className="left-aside">
          <SectionCarousel />
          <div className="main">
            <div className="main-header">
              <div className="tab-flex">
                <Tabs onChange={callback} tabBarExtraContent={operations}>
                  <TabPane tab="推荐" key="推荐"></TabPane>
                  <TabPane tab="前端" key="前端"></TabPane>
                  <TabPane tab="后端" key="后端"></TabPane>
                  <TabPane tab="Android" key="Android"></TabPane>
                  <TabPane tab="iOS" key="iOS"></TabPane>
                  <TabPane tab="人工智能" key="人工智能"></TabPane>
                  <TabPane tab="开发工具" key="开发工具"></TabPane>
                  <TabPane tab="代码人生" key="代码人生"></TabPane>
                  <TabPane tab="阅读" key="阅读"></TabPane>
                  <TabPane tab="其他" key="其他"></TabPane>
                </Tabs>
              </div>
              <div className="main-body">
                <Spin spinning={essayList.length === 0} tip="加载中，请稍后...">
                  <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                      onChange: (page) => {
                        console.log(page);
                      },
                      pageSize: 5
                    }}
                    dataSource={essayList}
                    renderItem={(item) => (
                      <List.Item
                        className="content-list"
                        key={item.title}
                        actions={
                          !loading && [
                            <Space key={item.title} size="middle">
                              <Space className="hoverBlue">
                                <IconText
                                  icon={EyeOutlined}
                                  text={item.visit_count}
                                  key="list-vertical-star-o"
                                />
                              </Space>

                              {!item.is_like && (
                                <Space
                                  className="hoverBlue"
                                  onClick={() => changeLike(item.id, true)}
                                >
                                  <IconText
                                    icon={LikeOutlined}
                                    text={item.like_count}
                                    key="list-vertical-like-o"
                                  />
                                </Space>
                              )}
                              {item.is_like && (
                                <Space
                                  className="hoverBlue"
                                  onClick={() => changeLike(item.id, false)}
                                >
                                  <IconText
                                    icon={LikeTwoTone}
                                    text={item.like_count}
                                    key="list-vertical-like-o"
                                  />
                                </Space>
                              )}
                              <Space className="hoverBlue">
                                <IconText
                                  icon={MessageOutlined}
                                  text={item.comment_count}
                                  key="list-vertical-message"
                                />
                              </Space>

                              {!item.is_collect && (
                                <Space
                                  className="hoverBlue"
                                  onClick={() => changeCollect(item.id, true)}
                                >
                                  <IconText
                                    icon={StarOutlined}
                                    text={item.collect_count}
                                    key="list-vertical-message"
                                  />
                                </Space>
                              )}
                              {item.is_collect && (
                                <Space
                                  className="hoverBlue"
                                  onClick={() => changeCollect(item.id, false)}
                                >
                                  <IconText
                                    icon={StarTwoTone}
                                    text={item.collect_count}
                                    key="list-vertical-message"
                                  />
                                </Space>
                              )}
                            </Space>
                          ]
                        }
                        extra={
                          <Popover
                            content="点击以查看文章详情"
                            onClick={() => turntoEssayDetail(item.id)}
                          >
                            <EyeTwoTone className="listSeeMore" />
                          </Popover>
                        }
                      >
                        <Skeleton loading={false} active avatar>
                          <List.Item.Meta
                            avatar={
                              <Space className="essayAvatar">
                                <Avatar src={item.avatar} />
                              </Space>
                            }
                            title={
                              <Space direction="vertical">
                                <Space className="essayHeader">
                                  {item.publish_user_id} | {item.publish_time} |{" "}
                                  {item.tab_id}
                                </Space>
                                <span className="essayTitle">{item.title}</span>
                              </Space>
                            }
                            description={
                              <Space className="essayDescription">
                                <span>{item.introduction}</span>
                              </Space>
                            }
                          />
                        </Skeleton>
                      </List.Item>
                    )}
                  />
                </Spin>
              </div>
            </div>
          </div>
        </div>
        <div className="right-aside">
          {/* 个人信息展示 */}
          <Card
            className="right-aside-card"
            actions={[<span key="enter">进入主页</span>]}
            hoverable="true"
          >
            <Skeleton loading={loading} avatar active>
              <Meta
                avatar={<Avatar src={user.avatar_url} />}
                title={user.username}
                description={user.introduction}
              />
              <Divider />
              <Space size={10}>
                <HeartTwoTone className="iconNum" />
                获得点赞{user.user_like_count}
              </Space>

              <Space size={10}>
                <EyeTwoTone className="iconNum" />
                文章被阅读{user.user_visit_count}
              </Space>
              <Space size={10}>
                <FireTwoTone className="iconNum" />
                潜力值{user.user_potential_count}
              </Space>
            </Skeleton>
          </Card>

          {/* 签到 */}
          <Card
            className="right-aside-card"
            hoverable="true"
            actions={[
              (!user.sign && (
                <Button
                  loading={signLoading}
                  type="primary"
                  shape="round"
                  icon={<ThunderboltFilled />}
                  size="large"
                  key="dailyNo"
                  onClick={() => dailySign()}
                >
                  签到
                </Button>
              )) ||
                (user.sign && (
                  <Button
                    type="default"
                    shape="round"
                    icon={<CheckCircleFilled />}
                    size="large"
                    key="dailyYes"
                    disabled
                  >
                    已签到
                  </Button>
                ))
            ]}
          >
            <Skeleton loading={loading} avatar active>
              <Meta
                avatar={
                  <Avatar
                    src={<Image src={user.avatar_url} style={{ width: 32 }} />}
                  />
                }
                title="上午好！"
                description="点亮你在社区的每一天"
              />
            </Skeleton>
          </Card>

          {/* 公告栏 */}
          <Card
            className="right-aside-card"
            title="公告栏"
            extra={<a href="#">More</a>}
            hoverable="true"
          >
            <List
              className="content-list-accnounce"
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

export default Section;
