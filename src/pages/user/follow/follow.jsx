import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router";
import { FollowStyle } from "./follow";
import { List, Avatar, Card, Spin, Button, Modal, message, Tabs } from "antd";
import { get_user_follow, get_user_followed } from "../../../service/user";

const { TabPane } = Tabs;

const Follow = () => {
  // const navigate = useNavigate();
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
        data.forEach((item) => {
          item.is_follow = true;
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

  // 跳转到用户主页
  // const turntoEssayDetail = (id) => {
  //   console.log("跳转到用户主页");
  //   navigate(`/user/${id}`);
  // };

  // 处理关注用户事件
  const focusUser = (item, index) => {
    console.log(item);
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
      <div className="followContainer"></div>
      <Spin spinning={loading} tip="加载中，请稍后...">
        <Card
          className="followAll"
          title="关注"
          extra={
            <Tabs defaultActiveKey="1" onChange={() => callback()}>
              <TabPane tab="关注的用户" key="1"></TabPane>
              <TabPane tab="关注者" key="2"></TabPane>
            </Tabs>
          }
          style={{ width: 300 }}
        >
          <List
            itemLayout="horizontal"
            dataSource={followList}
            renderItem={(item, index) => (
              <List.Item
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
                  avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                  title={<a href="https://ant.design">{item.title}</a>}
                  description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                />
              </List.Item>
            )}
          />
        </Card>
      </Spin>
    </FollowStyle>
  );
};

export default Follow;
