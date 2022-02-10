import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { SectionStyle } from "./style";
import {
  get_publish_essay,
  get_like_essay,
  get_collect_essay
} from "../../../../service/user";
import { formatDate } from "../../../../utils/date";
import { Avatar, List, Space, Spin } from "antd";
import {
  MessageOutlined,
  StarOutlined,
  LikeOutlined,
  EyeOutlined
} from "@ant-design/icons";

const EssayShowDetail = ({ name }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [essayList, setEssayList] = useState([]);
  const [loading, setLoading] = useState(false);

  // 初始化，获取首页所有文章的分类
  useEffect(() => {
    switch (name) {
      case "我的文章":
        tabsChange(get_publish_essay, id);
        break;
      case "我的点赞":
        tabsChange(get_like_essay);
        break;
      case "我的收藏":
        tabsChange(get_collect_essay);
        break;
    }
  }, []);

  // 根据key请求对应分类文章
  async function tabsChange(func, id) {
    setLoading(true);

    let res;
    try {
      if (id) res = await func({ id: id });
      else res = await func();
      let arr = res.data;
      arr.forEach((item) => {
        item.visit_count = parseInt(Math.random() * Math.random() * 1000); // 产生一个随机阅读量
      });
      setEssayList([...arr]);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  // 跳转到文章详情
  const turntoEssayDetail = (id) => {
    navigate(`/detail/${id}`);
  };

  return (
    <SectionStyle>
      <div className="main-body">
        <Spin spinning={loading} tip="加载中，请稍后...">
          <List
            itemLayout="vertical"
            size="large"
            pagination={{
              pageSize: 5
            }}
            dataSource={essayList}
            renderItem={(item) => (
              <List.Item
                onClick={() => turntoEssayDetail(item.id)}
                className="content-list"
                key={item.id}
                actions={
                  !loading && [
                    <Space key={item.id} size="middle">
                      <Space>
                        <IconText
                          icon={EyeOutlined}
                          text={item.visit_count}
                          key="list-vertical-star-o"
                        />
                      </Space>

                      {
                        <Space>
                          <IconText
                            icon={LikeOutlined}
                            text={item.like_count}
                            key="list-vertical-like-o"
                          />
                        </Space>
                      }
                      <Space>
                        <IconText
                          icon={MessageOutlined}
                          text={item.comment_count}
                          key="list-vertical-message"
                        />
                      </Space>

                      {
                        <Space>
                          <IconText
                            icon={StarOutlined}
                            text={item.collect_count}
                            key="list-vertical-message"
                          />
                        </Space>
                      }
                    </Space>
                  ]
                }
              >
                <List.Item.Meta
                  avatar={
                    <Space className="essayAvatar">
                      <Avatar
                        src={
                          item.avatar_url ??
                          require("../../../../assets/LoginOut.png")
                        }
                      />
                    </Space>
                  }
                  title={
                    <Space direction="vertical">
                      <Space className="essayHeader">
                        {item.username} | {formatDate(item.publish_time)}
                        {/* |{item.name} */}
                      </Space>
                      <span
                        className="essayTitle"
                        onClick={() => turntoEssayDetail(item.id)}
                      >
                        {item.title}
                      </span>
                    </Space>
                  }
                  description={
                    <Space className="essayDescription">
                      <span>{item.introduction}</span>
                    </Space>
                  }
                />
              </List.Item>
            )}
          />
        </Spin>
      </div>
    </SectionStyle>
  );
};

export default EssayShowDetail;
