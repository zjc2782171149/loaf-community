import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Avatar, Space, Card } from "antd";
import { get_topic_all, get_tabs_topic_ } from "../../../../service/topic";
import { get_user_follow, get_user_followed } from "../../../../service/user";

import moment from "moment";
moment.locale();

const { Meta } = Card;

const Self = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  // 用户相关
  useEffect(() => {
    async function initUser() {
      let topic_num = 0;
      let userNow = {
        avatar_url:
          userInfo.avatar_url ?? require("../../../../assets/LoginOut.png"),
        username: userInfo.username,
        introduction: userInfo.introduction ?? "该用户很懒，暂没留下个人介绍",
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
              if (item.user_id === userInfo.id) topic_num++;
            });
          }
          userNow.topic_num = topic_num;
          console.log(userNow);
          setUser({ ...userNow });
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

  return (
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
  );
};

export default Self;
