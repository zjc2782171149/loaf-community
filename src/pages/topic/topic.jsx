import React from "react";
import { useParams } from "react-router";
import { TopicStyle, LeftSideStyle, RightSideStyle } from "./topic";
import { List, Card } from "antd";
import Comments from "../../components/Comments/index.jsx";
import TopicDetail from "./components/TopicDetail/index.jsx";

const { Meta } = Card;

const Topic = () => {
  const { id } = useParams();
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
    <TopicStyle>
      <section className="topic">
        <LeftSideStyle>
          <div className="left-aside">
            <div className="main">
              {/* 话题详情 */}
              <TopicDetail id={id} />
            </div>
            {/* 评论区 */}
            <div className="send">
              <Comments id={id} type="topic" />
            </div>
            {/* 评论区 */}
          </div>
        </LeftSideStyle>
        <RightSideStyle>
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
    </TopicStyle>
  );
};

export default Topic;
