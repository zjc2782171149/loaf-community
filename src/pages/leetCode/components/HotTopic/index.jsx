import React, { useState, useEffect } from "react";
import { Card, Tag, List } from "antd";
import { createFromIconfontCN } from "@ant-design/icons";

const HotTopic = ({ data }) => {
  // iconfont图标
  const [randomLen, setRandom] = useState(0);
  const IconFont = createFromIconfontCN({
    scriptUrl: "//at.alicdn.com/t/font_3155494_c8d2d91r6m.js"
  });
  useEffect(() => {
    setRandom(Math.floor(Math.random() * 10));
  }, []);

  return (
    <Card
      className="right-aside-card"
      title={[
        <IconFont type="icon-hot1" className="hotStyle" key="hot" />,
        "热题榜"
      ]}
      hoverable="true"
    >
      <List
        className="right-aside-card-hot"
        size="small"
        // 热题榜通过随机数生成序列
        dataSource={data.slice(0, randomLen)}
        renderItem={(item) => (
          <List.Item
            key={item.id}
            actions={[
              (item.level === "简单" && (
                <Tag color="#00b6c3">{item.level}</Tag>
              )) ||
                (item.level === "中等" && (
                  <Tag color="#ffb800">{item.level}</Tag>
                )) ||
                (item.level === "困难" && (
                  <Tag color="#ff2d55">{item.level}</Tag>
                )),
              <a
                target="_blank"
                rel="noreferrer"
                href={item.url}
                key={item.url}
              >
                go
              </a>
            ]}
          >
            <List.Item.Meta description={item.title} />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default HotTopic;
