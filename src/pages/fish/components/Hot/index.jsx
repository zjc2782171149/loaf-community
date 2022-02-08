import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Space, Card, List } from "antd";
import { MessageOutlined } from "@ant-design/icons";

const Hot = ({ contentList }) => {
  const navigate = useNavigate();
  const [randomLen, setRandom] = useState(0);

  useEffect(() => {
    setRandom(Math.floor(Math.random() * 10));
  }, []);

  return (
    <Card className="right-aside-card" title={"热门唠嗑"} hoverable="true">
      <List
        className="hotList"
        itemLayout="horizontal"
        dataSource={contentList.slice(0, randomLen)}
        renderItem={(item, index) => (
          <List.Item
            key={index}
            onClick={() => {
              navigate(`/topic/${item.id}`);
            }}
          >
            <List.Item.Meta
              title={
                <Space size="large">
                  {item.username}
                  <Space>
                    <MessageOutlined />
                    {item.comment_count}
                  </Space>
                </Space>
              }
              description={
                <Space key="action" className="hotContent">
                  {item.content}
                </Space>
              }
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default Hot;
