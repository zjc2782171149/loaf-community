import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { SectionStyle } from "./topic";
import { List, Space, Card, Skeleton, Avatar, Button, Modal } from "antd";
import { ShareAltOutlined, MessageOutlined } from "@ant-design/icons";
import Comments from "../../pages/detail/components/Comments/index.jsx";
import { get_topic_detail } from "../../service/topic";
import {
  get_user_info,
  set__user_follow,
  delete_user_follow,
  get_which_user_follow
} from "../../service/user";
import { formatDate } from "../../utils/date";

const { Meta } = Card;

const TopicSection = () => {
  const { id } = useParams();
  const [topicDetail, setTopicDetail] = useState({});
  const [topicLoading, setTopicLoading] = useState(false);
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

  useEffect(() => {
    async function initTopic() {
      setTopicLoading(true);
      let publishUser = {};
      let flag = 0;
      try {
        // 根据文章id获取文章帖子详情
        const res = await get_topic_detail({ id: id });
        publishUser.publish_user_id = res.data.user_id;
        publishUser.publish_time = res.data.publish_time;
        publishUser.comment_count = res.data.comment_count;
        publishUser.content = res.data.content;

        // 根据发布者id请求详细用户信息
        const res2 = await get_user_info({ id: res.data.user_id });
        publishUser.username = res2.data.username;
        publishUser.avatar_url = res2.data.avatar_url;
        publishUser.position = res2.data.position;

        // 根据自己id请求是否关注了该用户
        const res3 = await get_which_user_follow({ id: res.data.user_id });
        res3.data.forEach((item) => {
          if (item.id === res.data.publish_user_id) {
            flag = 1;
          }
        });
        publishUser.is_follow = flag;
        setTopicDetail(publishUser);
        setTopicLoading(false);
      } catch (err) {
        console.log(err);
        setTopicLoading(false);
      }
    }
    initTopic();
  }, []);

  // 处理关注用户事件
  const focusUser = () => {
    try {
      if (topicDetail.is_follow) {
        Modal.confirm({
          title: "你确定要取消关注作者吗？",
          onOk: () => {
            delete_user_follow({ id: topicDetail.publish_user_id });

            setTopicDetail({
              ...topicDetail,
              is_follow: 0
            });
          }
        });
      } else {
        set__user_follow({ id: topicDetail.publish_user_id });

        setTopicDetail({
          ...topicDetail,
          is_follow: 1
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SectionStyle>
      <section className="section">
        <div className="left-aside">
          <div className="main">
            <div className="main-header">
              <div className="main-body">
                {/* 话题详情 */}
                <Card
                  bordered={false}
                  actions={[
                    <Space key="1">
                      <ShareAltOutlined />
                      分享
                    </Space>,
                    <Space key="comment">
                      <MessageOutlined />
                      评论
                    </Space>
                  ]}
                  key={topicDetail.id}
                >
                  <Skeleton loading={topicLoading} avatar active>
                    <Meta
                      avatar={
                        <Avatar
                          className="avatar"
                          src={
                            topicDetail.avatar_url ??
                            require("../../assets/LoginOut.png")
                          }
                        />
                      }
                      title={
                        <>
                          <Space size="large">
                            {topicDetail.username}
                            <Space className="publish-time">
                              {topicDetail.position}
                              {formatDate(topicDetail.publish_time)}
                            </Space>
                          </Space>

                          <Button
                            onClick={() => focusUser()}
                            type="primary"
                            style={
                              topicDetail.is_follow
                                ? { backgroundColor: "#2ecc71", border: "none" }
                                : {}
                            }
                            className="concernButton"
                          >
                            {topicDetail.is_follow ? "已关注" : "+ 关注"}
                          </Button>
                        </>
                      }
                      description={topicDetail.content}
                    />
                  </Skeleton>
                </Card>
              </div>
            </div>
          </div>
          {/* 评论区 */}
          <div className="send">
            <h1 className="commentTitle">评论</h1>
            <Comments id={id} type="topic" />
          </div>
          {/* 评论区 */}
        </div>
        <div className="right-aside">
          {/* 公告栏 */}
          <Card className="right-aside-card" title="相关推荐" hoverable="true">
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

export default TopicSection;
