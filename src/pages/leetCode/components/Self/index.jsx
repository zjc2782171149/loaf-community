import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Avatar, Space, Skeleton, Divider, Card } from "antd";
import { createFromIconfontCN } from "@ant-design/icons";
import { get_user_leetCode } from "../../../../service/leetCode";
import { SelfStyle } from "./style";

const { Meta } = Card;

const Self = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  // iconfont图标
  const IconFont = createFromIconfontCN({
    scriptUrl: "//at.alicdn.com/t/font_3155494_c8d2d91r6m.js"
  });

  // 用户信息初始化
  useEffect(() => {
    async function initUser() {
      setLoading(true);
      try {
        const res = await get_user_leetCode({ id: userInfo.id });
        let init = {};
        init.done_count = res.data[0].done_count;
        init.like_count = res.data[0].like_count;
        init.collect_count = res.data[0].collect_count;
        init.avatar_url = userInfo.avatar_url
          ? userInfo.avatar_url
          : require("../../../../assets/LoginOut.png");
        init.username = userInfo.username;
        init.introduction = userInfo.introduction;
        setUser(init);
      } catch (err) {
        console.log(err);
      }
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
            avatar={<Avatar src={user.avatar_url} />}
            title={user.username}
            description={
              user.introduction
                ? user.introduction
                : "该用户很懒，暂没留下个人介绍"
            }
          />
          <Divider />
          <Space direction="vertical">
            <Space size={10}>
              <IconFont type="icon-yiwancheng-lan" className="iconNum" />
              已完成题目数{user.done_count ? user.done_count : 0}
            </Space>

            <Space size={10}>
              <IconFont type="icon-dianzanlanse" className="iconNum" />
              已点赞题目数{user.like_count ? user.like_count : 0}
            </Space>
            <Space size={10}>
              <IconFont type="icon-shoucanglan" className="iconNum" />
              已收藏题目数{user.collect_count ? user.collect_count : 0}
            </Space>
          </Space>
        </Skeleton>
      </Card>
    </SelfStyle>
  );
};

export default Self;
