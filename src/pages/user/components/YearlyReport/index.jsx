import React, { useState, useEffect } from "react";
import { YearlyReportStyle } from "./style";
import { Image, Skeleton, Space, Row, Col, Card, Empty } from "antd";
import Posts from "../../posts/posts.jsx";
import Likes from "../../likes/likes.jsx";
import {
  get_user_follow,
  get_publish_essay,
  get_like_essay
} from "../../../../service/user";

const { Meta } = Card;

const YearlyReport = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const [loading, setLoading] = useState([]);
  const [followList, setFollowList] = useState([]);
  const [essayNum, setEssayNum] = useState(0);
  const [likeNum, setLikeNum] = useState(0);

  // 帖子初始化
  useEffect(() => {
    changeTabs();
  }, []);

  // 关注、文章、点赞数量初始化
  async function changeTabs() {
    setLoading(true);
    try {
      // 正在关注的用户
      const res = await get_user_follow();
      const res2 = await get_publish_essay({ id: userInfo.id });
      const res3 = await get_like_essay();
      setEssayNum(res2.data.length);
      setLikeNum(res3.data.length);
      let data = res.data;
      data.forEach((item) => {
        item.is_follow = true;
      });
      setFollowList(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }

  return (
    <YearlyReportStyle>
      <Skeleton active loading={loading} paragraph={{ rows: 16 }} round>
        <div className="yearly">
          <Image
            width={150}
            src={require("../../../../assets/LOGO.png")}
            preview={false}
          />
          <span className="title" style={{ color: userInfo.theme_color }}>
            年度报告
          </span>
          <div className="header">
            <Image
              width={100}
              src={require("../../../../assets/cat4.png")}
              preview={false}
            />
            <Space direction="vertical" className="introduction" size="large">
              <span style={{ color: userInfo.theme_color }}>
                经过了一年的社区游览，您在我们平台留下了许许多多的脚印，不知您是否还记得呢？
              </span>
              <span style={{ color: userInfo.theme_color }}>
                平凡的2021，有着不平凡的人们。2021年承载了我们太多的回忆，您在休闲之余看的文章、刷的力扣、发表的唠嗑，都展示着您对我们社区的认可。
              </span>
              <span style={{ color: userInfo.theme_color, fontSize: "20px" }}>
                为此我们为您统计了您的年度报告，请查收！
              </span>
            </Space>
            <Image
              className="imageRight"
              width={100}
              src={require("../../../../assets/cat1.png")}
              preview={false}
            />
          </div>
          <div className="main">
            <div className="one">
              <span
                className="one-title"
                style={{
                  color: userInfo.theme_color
                }}
              >
                关注数据分析
              </span>
              <div
                style={{
                  backgroundColor: userInfo.theme_color,
                  height: "2px",
                  margin: "10px 0"
                }}
              ></div>
              <Space className="one-section" direction="vertical">
                <span>
                  “愿你每晚都早睡，好生爱自己；愿你的身后总有力量，愿我陪你走到更远，收藏更多梦想。”
                </span>
                <span>
                  摸鱼学社已经为您生成了年度关注报告，下方为您在摸鱼学社上过去一年所关注的用户！
                </span>
              </Space>
              <Space
                className="one-section"
                style={{
                  color: userInfo.theme_color
                }}
              >
                您在过去的一年共关注了 {followList?.length}
                名用户，下面是您最在意的几名
              </Space>
              <Row gutter={16}>
                {followList.map((item, index) => {
                  return (
                    <Col className="gutter-row" span={4} key={index}>
                      <Card
                        cover={
                          <Image
                            alt="example"
                            src={item.avatar_url}
                            height={120}
                            preview={false}
                          />
                        }
                      >
                        <Meta
                          description={
                            <span
                              style={{
                                color: userInfo.theme_color,
                                fontWeight: "600",
                                marginLeft: "18px"
                              }}
                            >
                              {item.username}
                            </span>
                          }
                        />
                      </Card>
                    </Col>
                  );
                })}
              </Row>
              {Boolean(!followList.length) && <Empty />}
            </div>

            {/* 发表的文章 */}
            <div className="one">
              <span
                className="one-title"
                style={{
                  color: userInfo.theme_color
                }}
              >
                文章数据分析
              </span>
              <div
                style={{
                  backgroundColor: userInfo.theme_color,
                  height: "2px",
                  margin: "10px 0"
                }}
              ></div>
              <Space className="one-section" direction="vertical">
                <span>
                  “有时候，我们等的不是什么人什么事；我们等的是时间，等时间，让自己改变。”
                </span>
                <span>
                  摸鱼学社已经为您生成了年度文章报告，下方为您在摸鱼学社上过去一年所发表的部分文章！
                </span>
              </Space>
              <Space
                className="one-section"
                style={{
                  color: userInfo.theme_color
                }}
              >
                您在过去的一年共发表了 {essayNum ?? 0}
                篇文章，下面是您点赞量最高的几篇
              </Space>
              <Posts />
              {Boolean(!essayNum) && <Empty />}
            </div>

            {/* 点赞的文章 */}
            <div className="one">
              <span
                className="one-title"
                style={{
                  color: userInfo.theme_color
                }}
              >
                点赞数据分析
              </span>
              <div
                style={{
                  backgroundColor: userInfo.theme_color,
                  height: "2px",
                  margin: "10px 0"
                }}
              ></div>
              <Space className="one-section" direction="vertical">
                <span>
                  “趁阳光正好，去勇敢追逐！最好的时光里，愿你做好准备，迎接新的一月！”
                </span>
                <span>
                  摸鱼学社已经为您生成了年度点赞报告，下方为您在摸鱼学社上过去一年所点赞的部分文章！
                </span>
              </Space>
              <Space
                className="one-section"
                style={{
                  color: userInfo.theme_color
                }}
              >
                您在过去的一年共贡献了 {likeNum ?? 0}
                次点赞，下面是您所点赞的热门文章
              </Space>
              <Likes />
              {Boolean(!likeNum) && <Empty />}
            </div>
          </div>
        </div>
      </Skeleton>
    </YearlyReportStyle>
  );
};

export default YearlyReport;
