import React from "react";
import { useParams } from "react-router";
import { TopicStyle, LeftSideStyle, RightSideStyle } from "./topic";
import { Card, Space } from "antd";
import Comments from "../../components/Comments/index.jsx";
import TopicDetail from "./components/TopicDetail/index.jsx";

const { Meta } = Card;

const Topic = () => {
  const { id } = useParams();

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
            <Space direction="vertical" size="middle">
              {/* 照片/广告 */}
              <Card
                hoverable="true"
                cover={
                  <img alt="example" src={require("../../assets/cat4.png")} />
                }
              >
                <Meta title="欣赏可爱猫猫" />
              </Card>

              {/* 照片/广告 */}
              <Card
                hoverable="true"
                cover={
                  <img alt="example" src="https://joeschmoe.io/api/v1/random" />
                }
              >
                <Meta
                  title="广告位招租"
                  description="有需要的可以来找我们哈哈"
                />
              </Card>
            </Space>
          </div>
        </RightSideStyle>
      </section>
    </TopicStyle>
  );
};

export default Topic;
