import React, { useState, useEffect } from "react";
import { Space, Skeleton, Divider, Card } from "antd";
import { StarTwoTone, HeartTwoTone, FundTwoTone } from "@ant-design/icons";
import { SelfStyle } from "./style";
import { get_like_collect_num } from "../../../../service/home";
import { get_user_follow, get_user_followed } from "../../../../service/user";

const { Meta } = Card;

const Self = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  // 用户信息初始化
  useEffect(() => {
    async function initUser() {
      const res = await get_like_collect_num({ id: userInfo.id });
      const res2 = await get_user_follow();
      const res3 = await get_user_followed();
      setUser({
        avatar_url: userInfo.avatar_url,
        username: userInfo.username,
        introduction: userInfo.introduction ?? "该用户很懒，暂没留下个人介绍",
        user_like_count: res.data.like_count ?? 0,
        user_collect_count: res.data.collect_count ?? 0,
        user_potential_count: parseInt(Math.random() * Math.random() * 1000), // 随机生成潜力值
        user_following_count: res2.data.length ?? 0,
        user_followed_count: res3.data.length ?? 0
      });
      setLoading(false);
    }
    initUser();
  }, []);

  return (
    <SelfStyle>
      <Card
        className="right-aside-card"
        hoverable="true"
        actions={[
          <Space
            size={10}
            direction="vertical"
            key="following"
            className="follow"
          >
            关注了{user.user_following_count}
          </Space>,
          <Space
            size={10}
            direction="vertical"
            key="followed"
            className="follow"
          >
            关注者{user.user_followed_count}
          </Space>
        ]}
      >
        <Skeleton loading={loading} avatar active>
          <Meta title={<span className="titlePerson">个人成就</span>} />
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
              <FundTwoTone className="iconNum" />
              潜力值{user.user_potential_count}
            </Space>
          </Space>
        </Skeleton>
      </Card>
    </SelfStyle>
  );
};

export default Self;
