import React, { useState, useEffect } from "react";
import SectionCarousel from "../carousel/carousel.jsx";
import { SectionStyle } from "./section";

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
  Popover
  // BackTop
} from "antd";
import {
  MessageOutlined,
  HeartFilled,
  EyeFilled,
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

  // const style = {
  //   height: 40,
  //   width: 40,
  //   lineHeight: "40px",
  //   borderRadius: 4,
  //   backgroundColor: "#1088e9",
  //   color: "#fff",
  //   textAlign: "center",
  //   fontSize: 14
  // };

  // 文章的列表相关
  useEffect(() => {
    const recommend_essay = [];
    // front_essay = [],
    // after_essay = [],
    // Android_essay = [],
    // iOS_essay = [],
    // personalIntelligence_essay = [],
    // tool_essay = [],
    // code_essay = [],
    // read_essay = [],
    // other_essay = [];
    for (let i = 0; i < 6; i++) {
      recommend_essay.push({
        href: "",
        title: `推荐部分 ${i}`,
        avatar: require("../../../assets/personalAvatar.jpg"),
        introduction: "recommend",
        visit_count: 122,
        like_count: 22,
        comment_count: 10
      });
    }

    // 先模拟从接口获取数据的异步
    setTimeout(() => {
      setEssayList(recommend_essay);
    }, 100);
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
                          <IconText
                            icon={EyeFilled}
                            text={item.visit_count}
                            key="list-vertical-star-o"
                          />,
                          <IconText
                            icon={HeartFilled}
                            text={item.like_count}
                            key="list-vertical-like-o"
                          />,
                          <IconText
                            icon={MessageOutlined}
                            text={item.comment_count}
                            key="list-vertical-message"
                          />
                        ]
                      }
                      extra={
                        <Popover content="点击以查看文章详情">
                          <EyeTwoTone className="listSeeMore" />
                        </Popover>
                      }
                    >
                      <Skeleton loading={loading} active avatar>
                        <List.Item.Meta
                          avatar={<Avatar src={item.avatar} />}
                          title={<a href={item.href}>{item.title}</a>}
                          description={item.introduction}
                        />
                      </Skeleton>
                    </List.Item>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="right-aside">
          {/* 个人信息展示 */}
          <Card
            className="right-aside-card"
            actions={[<text key="enter">进入主页</text>]}
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
                获得点赞： {user.user_like_count}
              </Space>

              <Space size={10}>
                <EyeTwoTone className="iconNum" />
                文章被阅读： {user.user_visit_count}
              </Space>
              <Space size={10}>
                <FireTwoTone className="iconNum" />
                潜力值：{user.user_potential_count}
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
                  type="primary"
                  shape="round"
                  icon={<ThunderboltFilled />}
                  size="large"
                  key="daily"
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
                    key="daily"
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
            style={{ width: 300 }}
            hoverable="true"
          >
            <List
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
              className="content-list"
            />
          </Card>

          {/* 照片/广告 */}
          <Card
            className="right-aside-card"
            hoverable="true"
            style={{ width: 295 }}
            cover={
              <img alt="example" src="https://joeschmoe.io/api/v1/random" />
            }
          >
            <Meta title="广告位招租" description="有需要的可以来找我们哈哈" />
          </Card>
        </div>
      </section>
      {/* <BackTop>
        <div style={style}>UP</div>
      </BackTop> */}
    </SectionStyle>
  );
};

export default Section;
