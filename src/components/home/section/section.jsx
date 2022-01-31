import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import EssayShowDetail from "../../../layout/essayShowDetail/index.jsx";
import SectionCarousel from "../carousel/carousel.jsx";
import { SectionStyle } from "./section";
import {
  get_like_comment,
  get_like_essay,
  get_collect_essay,
  get_user_sign,
  set_user_sign
} from "../../../service/home";

import {
  Button,
  Avatar,
  List,
  Space,
  Skeleton,
  Card,
  Divider,
  Image,
  message,
  notification
} from "antd";
import {
  StarTwoTone,
  ThunderboltFilled,
  HeartTwoTone,
  FireTwoTone,
  CheckCircleFilled
} from "@ant-design/icons";

const { Meta } = Card;

const Section = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  let userInfo = JSON.parse(localStorage.getItem("userInfo"));

  // 用户信息初始化
  useEffect(() => {
    async function initUser() {
      const req = [get_like_comment(), get_like_essay(), get_collect_essay()];
      const initMessage = await Promise.all(req);
      const likeComment = initMessage[0]; // 用户点赞评论
      const likeEssay = initMessage[1];
      const collectEssay = initMessage[2];

      setUser({
        avatar_url: userInfo.avatar_url
          ? userInfo.avatar_url
          : require("../../../assets/LoginOut.png"),
        username: userInfo.username,
        introduction: userInfo.introduction
          ? userInfo.introduction
          : "暂无个人介绍",
        user_like_count: likeComment.data.length + likeEssay.data.length || 13,
        user_collect_count: collectEssay.data.length || 132,
        user_potential_count: parseInt(Math.random() * Math.random() * 1000) // 随机生成潜力值
      });
      setLoading(false);

      // 查询签到
      console.log("查询签到");
      const haveSign = await get_user_sign();
      setDailySign(haveSign.data.today);
    }
    initUser();
  }, []);

  const announcementList = [
    {
      title: "关于我们(bug生产队)",
      time: "2022-02-10",
      description:
        "可通过链接了解我们https://lhcgmmdf97.feishu.cn/docs/doccnYqYVMI4JMLmANnXKGCwdKe#"
    },
    {
      title: "【笔记创作活动】已开启，超值礼品等…",
      time: "2022-01-17",
      description:
        "认真记录、创作笔记内容的同学将有机会获得我们为大家准备超值大奖🎁 春节礼盒、小米蓝牙耳机、卫衣、保温杯......等你来拿"
    },
    {
      title: "【好题分享活动】开奖啦~",
      time: "2022-01-17",
      description: "请中奖的同学尽快联系相关社区工作人员"
    },
    {
      title: "摸鱼学社|意见&建议反馈收集",
      time: "2022-01-15",
      description:
        "如果你对社区有好的建议，欢迎留言，让我们一起把青训营社区建设得更好吧~"
    }
  ];
  const openAnnouncement = (title) => {
    console.log(title);
    announcementList.forEach((item) => {
      if (item.title === title) {
        notification.open({
          message: item.title,
          description: item.description,
          duration: 2
        });
      }
    });
  };

  // 每日签到
  const [signLoading, setSignLoading] = useState(false);
  const [dailySign, setDailySign] = useState(false);
  const key = "updatable";
  async function DailySign() {
    setSignLoading(true);
    message.loading({ content: "请耐心等待", key });
    const res = await set_user_sign();
    setTimeout(() => {
      setSignLoading(false);
      setDailySign(true);
      message.success({
        content: `恭喜您，${res.msg}!`,
        key,
        duration: 2
      });
    }, 1000);
  }

  const enterUser = () => {
    navigate(`/user/${userInfo.id}/profile`);
  };

  return (
    <SectionStyle>
      <section className="section">
        <div className="left-aside">
          <SectionCarousel />
          <div className="main">
            <div className="main-header">
              <EssayShowDetail />
            </div>
          </div>
        </div>
        <div className="right-aside">
          {/* 个人信息展示 */}
          <Card
            className="right-aside-card"
            actions={[
              <span key="enter" onClick={() => enterUser()}>
                进入主页
              </span>
            ]}
            hoverable="true"
          >
            <Skeleton loading={loading} avatar active>
              <Meta
                avatar={<Avatar src={user.avatar_url} />}
                title={user.username}
                description={user.introduction}
              />
              <Divider />
              <Space direction="vertical">
                <Space size={10}>
                  <HeartTwoTone className="iconNum" />
                  获得点赞{user.user_like_count}
                </Space>

                <Space size={10}>
                  <StarTwoTone className="iconNum" />
                  文章被收藏{user.user_collect_count}
                </Space>
                <Space size={10}>
                  <FireTwoTone className="iconNum" />
                  潜力值{user.user_potential_count}
                </Space>
              </Space>
            </Skeleton>
          </Card>

          {/* 签到 */}
          <Card
            className="right-aside-card"
            hoverable="true"
            actions={[
              (!dailySign && (
                <Button
                  loading={signLoading}
                  type="primary"
                  shape="round"
                  icon={<ThunderboltFilled />}
                  size="large"
                  key="dailyNo"
                  onClick={() => DailySign()}
                >
                  签到
                </Button>
              )) ||
                (dailySign && (
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
            <Meta
              avatar={
                <Avatar
                  src={<Image src={user.avatar_url} style={{ width: 32 }} />}
                />
              }
              title="上午好！"
              description="点亮你在社区的每一天"
            />
          </Card>

          {/* 公告栏 */}
          <Card
            className="right-aside-card"
            title="公告栏"
            extra={<a href="">更多</a>}
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
                    title={
                      <a
                        href=""
                        onClick={(e) => {
                          e.preventDefault();
                          openAnnouncement(item.title);
                        }}
                      >
                        {item.title}
                      </a>
                    }
                    description={item.time}
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
