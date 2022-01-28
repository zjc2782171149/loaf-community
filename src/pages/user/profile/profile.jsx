import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ProfileStyle } from "./profile";
import { List, Avatar, Card, Space, Skeleton, Spin } from "antd";
import {
  ShareAltOutlined,
  MessageOutlined,
  LikeOutlined,
  LikeTwoTone
} from "@ant-design/icons";

const { Meta } = Card;

const Profile = () => {
  const navigate = useNavigate();
  const [profileList, setProfileList] = useState([]);

  useEffect(() => {
    const arrayList = [
      {
        id: 1,
        title: (
          <>
            Smooth
            <p className="publish-time">30分钟前</p>
          </>
        ),
        avatar: require("../../../assets/personalAvatar.jpg"),
        description: "这是一条测试",
        like_num: 0,
        comment_num: 0,
        is_like: false
      }
    ];
    setTimeout(() => {
      setProfileList(arrayList);
    }, 1000);
  }, []);

  // 改变文章点赞状态
  const changeLike = (id) => {
    profileList.forEach((item) => {
      if (item.id === id) {
        item.is_like = !item.is_like;
        if (item.is_like === false) item.like_num--;
        else item.like_num++;
      }
    });
    setProfileList([...profileList]);
  };

  // 跳转到文章详情
  const turntoEssayDetail = (id) => {
    console.log("跳转到动态详情");
    navigate(`/topic/${id}`);
  };

  return (
    <ProfileStyle>
      {/* 我赞的文章 */}
      <List
        loading={profileList.length ? false : <Spin />}
        itemLayout="horizontal"
        dataSource={profileList}
        renderItem={(item) => (
          <Card
            className="likes"
            title="Smooth赞了这篇文章"
            bordered={false}
            actions={[
              <Space key="likes" onClick={() => changeLike(item.id)}>
                {item.is_like ? <LikeTwoTone /> : <LikeOutlined />}
                {item.like_num}
              </Space>,
              <Space key="comment" onClick={() => turntoEssayDetail(item.id)}>
                <MessageOutlined />
                {item.comment_num}
              </Space>,
              <Space key="share">
                <ShareAltOutlined />
                分享
              </Space>
            ]}
            key={item.description}
          >
            <Skeleton loading={false} avatar active>
              <Meta
                onClick={() => turntoEssayDetail(item.id)}
                avatar={<Avatar src={item.avatar} />}
                title={<Space>{item.title}</Space>}
                description={item.description}
              />
            </Skeleton>
          </Card>
        )}
      />
    </ProfileStyle>
  );
};

export default Profile;
