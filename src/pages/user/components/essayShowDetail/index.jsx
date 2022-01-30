import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { SectionStyle } from "./style";
import {
  get_user_info,
  get_essay_detail
  // get_essay_status,
  // get_publish_topic
} from "../../../../service/home";
import {
  get_publish_essay,
  get_like_essay,
  get_collect_essay
} from "../../../../service/user";
import { formatDate } from "../../../../utils/date";
import moment from "moment";
moment.locale();

import { Avatar, List, Space, Popover, Spin } from "antd";
import {
  MessageOutlined,
  StarOutlined,
  LikeOutlined,
  EyeOutlined,
  EyeTwoTone
} from "@ant-design/icons";

const EssayShowDetail = ({ name }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [essayList, setEssayList] = useState([]);
  const [loading, setLoading] = useState(false);
  // const userInfo = JSON.parse(localStorage.getItem("userInfo"));

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

    console.log(func);

    // 如果找到该 板块，进行请求
    try {
      // 由于api在上面返回的数据中还没四个数量和 点赞收藏状态，还得分别再进行两个api的申请
      let result;
      if (id) result = await func({ id: id });
      else result = await func();

      console.log(result.data);
      let arr = result.data;
      const length = arr.length;
      for (let i = 0; i <= length; i++) {
        // 跳出循环
        if (i === length) {
          setLoading(false);
          break;
        }
        // 进行请求
        const res = await get_essay_detail({
          id: arr[i].id
        });
        console.log(res);
        const { like_count, collect_count, comment_count, publish_user_id } =
          res.data; // 抽离出发布者

        // 再根据每篇文章 发布者ID，去查找发布者姓名
        console.log(publish_user_id);
        const resUser = await get_user_info({ id: publish_user_id });
        const { username, avatar_url } = resUser.data;
        arr[i].like_count = like_count ? like_count : 0;
        arr[i].collect_count = collect_count ? collect_count : 0;
        arr[i].comment_count = comment_count ? comment_count : 0;
        arr[i].visit_count = parseInt(Math.random() * Math.random() * 1000); // 产生一个随机阅读量
        // 发布时间，将时间戳格式化为相对时间
        arr[i].publish_time = arr[i].publish_time
          ? moment(formatDate(formatDate(arr[i].publish_time)), "YYYYMMDD")
              .startOf("day")
              .fromNow()
          : "时间数据有误";
        arr[i].avatar_url = avatar_url
          ? avatar_url
          : require("../../assets/LoginOut.png");
        arr[i].username = username;
        // arr[i].name = arr[i].name ? arr[i].name : "无";
        setEssayList([...arr]);
      }
    } catch (err) {
      console.log(err);
      setEssayList([]);
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
    console.log("跳转到动态详情");
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

                      {
                        <Space className="hoverBlue">
                          <IconText
                            icon={LikeOutlined}
                            text={item.like_count}
                            key="list-vertical-like-o"
                          />
                        </Space>
                      }
                      <Space className="hoverBlue">
                        <IconText
                          icon={MessageOutlined}
                          text={item.comment_count}
                          key="list-vertical-message"
                        />
                      </Space>

                      {
                        <Space className="hoverBlue">
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
                extra={
                  <Popover
                    content="点击以查看文章详情"
                    onClick={() => turntoEssayDetail(item.id)}
                  >
                    <EyeTwoTone className="listSeeMore" />
                  </Popover>
                }
              >
                <List.Item.Meta
                  avatar={
                    <Space className="essayAvatar">
                      <Avatar src={item.avatar_url} />
                    </Space>
                  }
                  title={
                    <Space direction="vertical">
                      <Space className="essayHeader">
                        {item.username} | {item.publish_time}
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
