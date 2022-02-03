import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Avatar, Space, Skeleton, Divider, Card } from "antd";
import { StarTwoTone, HeartTwoTone, FireTwoTone } from "@ant-design/icons";
import { get_like_collect_num } from "../../../../service/home";
import { SelfStyle } from "./style";

const { Meta } = Card;

const Self = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  // 用户信息初始化
  useEffect(() => {
    async function initUser() {
      const res = await get_like_collect_num({ id: userInfo.id });
      setUser({
        avatar_url: userInfo.avatar_url,
        username: userInfo.username,
        introduction: userInfo.introduction ?? "该用户很懒，暂没留下个人介绍",
        user_like_count: res.data.like_count ?? 0,
        user_collect_count: res.data.collect_count ?? 0,
        user_potential_count: parseInt(Math.random() * Math.random() * 1000) // 随机生成潜力值
      });
      setLoading(false);
    }
    initUser();
  }, []);

  const enterUser = () => {
    navigate(`/user/${userInfo.id}/profile`);
  };

  return (
    <SelfStyle>
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
            avatar={
              <Avatar
                src={
                  user.avatar_url ?? require("../../../../assets/LoginOut.png")
                }
              />
            }
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
    </SelfStyle>
  );
};

export default Self;
