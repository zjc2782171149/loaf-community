import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { FollowStyle } from "./follow";
import {
  List,
  Avatar,
  Spin,
  Button,
  Modal,
  message,
  Tabs,
  Space,
  Divider
} from "antd";
import { get_user_follow, get_user_followed } from "../../../service/user";

const { TabPane } = Tabs;

const Follow = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState([]);
  const [followList, setFollowList] = useState([]);

  // 帖子初始化
  useEffect(() => {
    changeTabs("following");
  }, []);

  // 切换关注的用户、关注者
  async function changeTabs(key) {
    try {
      if (key === "following") {
        // 正在关注的用户
        const res = await get_user_follow();
        let data = res.data;
        data.forEach((item) => {
          item.is_follow = true;
        });
        setFollowList(data);
        setLoading(false);
      } else {
        // 被谁关注了
        const res = await get_user_followed();
        let data = res.data;
        // 从关注列表中找，看看有没有id跟关注者列表中一样的
        data.forEach((item) => {
          if (followList.findIndex((element) => element.id === item.id) >= 0) {
            item.is_follow = true;
          } else {
            item.is_follow = false;
          }
        });
        setFollowList(data);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  function callback(key) {
    console.log(key);
    if (key === 1) callback("following");
    else callback("followed");
  }

  // 跳转到他人主页
  const turntOtherHome = (id) => {
    console.log("跳转到他人主页");
    navigate(`/user/${id}/posts`);
  };

  // 处理关注用户事件
  const focusUser = (item, index) => {
    console.log(item, index);
    if (localStorage.getItem("token")) {
      if (item.is_follow) {
        Modal.confirm({
          title: "你确定要取消关注作者吗？",
          onOk: () => {
            followList[index].is_follow = !item.is_follow;
            setFollowList([...followList]);
          }
        });
      } else {
        // 进行关注
        followList[index].is_follow = !item.is_follow;
        setFollowList([...followList]);
      }
    } else {
      message.info("请先登录");
    }
  };

  return (
    <FollowStyle>
      <Spin spinning={loading} tip="加载中，请稍后...">
        <Space>
          <span className="focus">关注</span>
          <Tabs
            defaultActiveKey="1"
            onChange={() => callback()}
            className="focusTabs"
            size="small"
          >
            <TabPane tab="关注的用户" key="1"></TabPane>
            <TabPane tab="关注者" key="2"></TabPane>
          </Tabs>
        </Space>

        <Divider />

        <List
          itemLayout="horizontal"
          dataSource={followList}
          renderItem={(item, index) => (
            <List.Item
              onClick={() => turntOtherHome(item.id)}
              extra={
                <Button
                  onClick={() => focusUser(item, index)}
                  type="primary"
                  style={
                    item.is_follow
                      ? { backgroundColor: "#2ecc71", border: "none" }
                      : {}
                  }
                  className="author-love"
                >
                  {item.is_follow ? "已关注" : "+ 关注"}
                </Button>
              }
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={
                      item.avatar_url
                        ? item.avatar_url
                        : require("../../../assets/LoginOut.png")
                    }
                  />
                }
                title={
                  <Space>
                    <a>{item.username}</a>
                    <span>{item.position}</span>
                  </Space>
                }
                description={item.introduction}
              />
            </List.Item>
          )}
        />
      </Spin>
    </FollowStyle>
  );
};

export default Follow;
