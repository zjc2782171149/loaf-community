import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { SaysStyle } from "./says";
import { List, Avatar, Card, Space, Skeleton, Spin } from "antd";
import { ShareAltOutlined, MessageOutlined } from "@ant-design/icons";
import { get_user_topic } from "../../../service/topic";
import { get_topic_all } from "../../../service/topic";
import { formatDate } from "../../../utils/date";
import moment from "moment";
moment.locale();

const { Meta } = Card;

const Says = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState([]);
  const [saysList, setSaysList] = useState([]);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  // 帖子初始化
  useEffect(() => {
    async function initTopic() {
      setLoading(true);
      try {
        const res = await get_user_topic();
        await get_topic_all();
        setSaysList(res.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }
    initTopic();
  }, []);

  // 跳转到文章详情
  const turntoEssayDetail = (id) => {
    console.log("跳转到动态详情");
    navigate(`/topic/${id}`);
  };

  return (
    <SaysStyle>
      <Spin spinning={loading} tip="加载中，请稍后...">
        <List
          itemLayout="horizontal"
          dataSource={saysList}
          renderItem={(item) => (
            <Card
              className="cardCursor"
              bordered={false}
              actions={[
                <Space key="1">
                  <ShareAltOutlined />
                  分享
                </Space>,
                <Space key="comment" onClick={() => turntoEssayDetail(item.id)}>
                  <MessageOutlined />
                  {item.comment_count}
                </Space>
              ]}
              key={item.id}
            >
              <Skeleton loading={false} avatar active>
                <Meta
                  onClick={() => turntoEssayDetail(item.id)}
                  avatar={
                    <Avatar
                      src={
                        userInfo.avatar_url ??
                        require("../../../assets/LoginOut.png")
                      }
                    />
                  }
                  title={
                    <>
                      <p>{userInfo.username}</p>
                      <Space className="publish-time">
                        {/* position */}
                        {item.publish_time ? formatDate(item.publish_time) : ""}
                        {userInfo.position ?? ""}
                      </Space>
                    </>
                  }
                  description={item.content ?? "暂无帖子介绍"}
                />
              </Skeleton>
            </Card>
          )}
        />
      </Spin>
    </SaysStyle>
  );
};

export default Says;
