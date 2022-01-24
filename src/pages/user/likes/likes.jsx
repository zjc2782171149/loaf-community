import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { LikesStyle } from "./likes";
import { List, Avatar, Space, Skeleton, Spin, Button } from "antd";
import {
  MessageOutlined,
  StarOutlined,
  LikeOutlined,
  EyeOutlined,
  LikeTwoTone,
  StarTwoTone,
  PlusOutlined
} from "@ant-design/icons";

const Likes = () => {
  const navigate = useNavigate();
  let loading = false;
  const [essayList, setEssayList] = useState([]);
  // 文章的列表相关
  useEffect(() => {
    const recommend_essay = [];
    for (let i = 0; i < 6; i++) {
      recommend_essay.push({
        id: i,
        title: `文章 ${i}`,
        avatar: require("../../../assets/personalAvatar.jpg"),
        publish_user_id: "某不知名网友",
        publish_time: "3个月前",
        tab_id: "前端",
        introduction:
          "recommend发发生的发生打两份金仕达傅雷家书大幅房间爱了司法局安师傅射流风机sad拉副书记的撒发受得了",
        visit_count: 1,
        like_count: 0,
        comment_count: 0,
        collect_count: 0,
        is_like: false,
        is_collect: false,
        is_follow: false
      });
    }

    // 先模拟从接口获取数据的异步
    setTimeout(() => {
      setEssayList(recommend_essay);
    }, 1000);
  }, []);

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  // 跳转到文章详情
  const turntoEssayDetail = (id) => {
    console.log("跳转到动态详情");
    navigate(`/topic/${id}`);
  };

  // 改变文章点赞状态
  const changeLike = (id, bool) => {
    console.log(id, bool);
    essayList.forEach((item) => {
      if (item.id === id) {
        // 找到这篇文章了
        if (bool) {
          // 点赞
          item.is_like = true;
          item.like_count++;
        } else {
          // 取消点赞
          item.is_like = false;
          item.like_count--;
        }
      }
    });

    setEssayList([...essayList]);
  };

  // 改变文章收藏状态
  const changeCollect = (id, bool) => {
    console.log(id, bool);
    essayList.forEach((item) => {
      if (item.id === id) {
        // 找到这篇文章了
        if (bool) {
          // 点赞
          item.is_collect = true;
          item.collect_count++;
        } else {
          // 取消点赞
          item.is_collect = false;
          item.collect_count--;
        }
      }
    });
    setEssayList([...essayList]);
  };

  // 改变用户关注状态
  const changeFollow = (id, follow) => {
    console.log(id, follow);
    essayList.forEach((item) => {
      if (item.id === id) {
        // 找到这篇文章了
        item.is_follow = !item.is_follow;
      }
    });
    setEssayList([...essayList]);
  };

  return (
    <LikesStyle>
      <List
        loading={essayList.length ? false : <Spin />}
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 5
        }}
        dataSource={essayList}
        renderItem={(item) => (
          <List.Item
            className="content-list"
            key={item.title}
            actions={
              !loading && [
                <Space key={item.title} size="middle">
                  <Space className="hoverBlue">
                    <IconText
                      icon={EyeOutlined}
                      text={item.visit_count}
                      key="list-vertical-star-o"
                    />
                  </Space>

                  {!item.is_like && (
                    <Space
                      className="hoverBlue"
                      onClick={() => {
                        changeLike(item.id, true);
                      }}
                    >
                      <IconText
                        icon={LikeOutlined}
                        text={item.like_count}
                        key="list-vertical-like-o"
                      />
                    </Space>
                  )}
                  {item.is_like && (
                    <Space
                      className="hoverBlue"
                      onClick={() => {
                        changeLike(item.id, false);
                      }}
                    >
                      <IconText
                        icon={LikeTwoTone}
                        text={item.like_count}
                        key="list-vertical-like-o"
                      />
                    </Space>
                  )}
                  <Space className="hoverBlue">
                    <IconText
                      icon={MessageOutlined}
                      text={item.comment_count}
                      key="list-vertical-message"
                    />
                  </Space>

                  {!item.is_collect && (
                    <Space
                      className="hoverBlue"
                      onClick={() => {
                        changeCollect(item.id, true);
                      }}
                    >
                      <IconText
                        icon={StarOutlined}
                        text={item.collect_count}
                        key="list-vertical-message"
                      />
                    </Space>
                  )}
                  {item.is_collect && (
                    <Space
                      className="hoverBlue"
                      onClick={() => {
                        changeCollect(item.id, false);
                      }}
                    >
                      <IconText
                        icon={StarTwoTone}
                        text={item.collect_count}
                        key="list-vertical-message"
                      />
                    </Space>
                  )}
                </Space>
              ]
            }
            extra={
              <Space
                onClick={() => {
                  changeFollow(item.id, item.is_follow);
                }}
              >
                {!item.is_follow && (
                  <Button
                    className="unfollowed"
                    type="primary"
                    icon={<PlusOutlined />}
                  >
                    关注
                  </Button>
                )}
                {item.is_follow && <Button className="followed">已关注</Button>}
              </Space>
            }
          >
            <Skeleton loading={false} active avatar>
              <List.Item.Meta
                onClick={() => turntoEssayDetail(item.id)}
                avatar={
                  <Space className="essayAvatar">
                    <Avatar src={item.avatar} />
                  </Space>
                }
                title={
                  <Space direction="vertical">
                    <Space className="essayHeader">
                      {item.publish_user_id} | {item.publish_time} |{" "}
                      {item.tab_id}
                    </Space>
                    <span className="essayTitle">{item.title}</span>
                  </Space>
                }
                description={
                  <Space className="essayDescription">
                    <span>{item.introduction}</span>
                  </Space>
                }
              />
            </Skeleton>
          </List.Item>
        )}
      />
    </LikesStyle>
  );
};

export default Likes;
