import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { SaysStyle } from "./says";
import { List, Avatar, Card, Space, Skeleton, Spin } from "antd";
import { ShareAltOutlined, MessageOutlined } from "@ant-design/icons";

const { Meta } = Card;

const Says = () => {
  const navigate = useNavigate();
  const [saysList, setSaysList] = useState([]);

  useEffect(() => {
    const arrayList = [
      {
        id: 1,
        title: <>Smooth</>,
        avatar: require("../../../assets/personalAvatar.jpg"),
        description: "这是一条测试",
        comment_num: 0
      },
      {
        id: 1,
        title: <>Smooth</>,
        avatar: require("../../../assets/personalAvatar.jpg"),
        description: "这是一条测试",
        comment_num: 0
      }
    ];
    setTimeout(() => {
      setSaysList(arrayList);
    }, 1000);
  }, []);

  // 跳转到文章详情
  const turntoEssayDetail = (id) => {
    console.log("跳转到动态详情");
    navigate(`/topic/${id}`);
  };

  return (
    <SaysStyle>
      <List
        loading={saysList.length ? false : <Spin />}
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
                {item.comment_num}
              </Space>
            ]}
            key={item.id}
          >
            <Skeleton loading={false} avatar active>
              <Meta
                onClick={() => turntoEssayDetail(item.id)}
                avatar={
                  <Avatar src={require("../../../assets/personalAvatar.jpg")} />
                }
                title={
                  <>
                    <p>Smooth</p>
                    <Space className="publish-time">
                      {/* position */}
                      前端开发工程师
                      {new Date().getFullYear() +
                        "-" +
                        (new Date().getMonth() + 1) +
                        "-" +
                        new Date().getDate()}
                    </Space>
                  </>
                }
                description={"13fsadasdsa"}
              />
            </Skeleton>
          </Card>
        )}
      />
    </SaysStyle>
  );
};

export default Says;
