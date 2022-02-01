import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { SectionStyle } from "./style";
import {
  get_essay_all,
  get_tabs_essay,
  like_essay,
  dislike_essay,
  collect_essay,
  discollect_essay
} from "../../service/home";
import { formatDate } from "../../utils/date";
import moment from "moment";
moment.locale();

import { Button, Avatar, Tabs, Menu, Dropdown, List, Space, Spin } from "antd";
import {
  MessageOutlined,
  StarOutlined,
  LikeOutlined,
  EyeOutlined,
  LikeTwoTone,
  StarTwoTone,
  FireTwoTone,
  DashboardTwoTone
} from "@ant-design/icons";

const { TabPane } = Tabs;

const EssayShowDetail = () => {
  const navigate = useNavigate();
  const [essayList, setEssayList] = useState([]);
  const [tabsList, setTabsList] = useState([]);
  const [loading, setLoading] = useState(false);

  // 初始化，获取首页所有文章的分类
  useEffect(() => {
    async function getEssayAll() {
      try {
        setLoading(true);
        const res = await get_essay_all();
        const arr = res.data;
        setTabsList([...arr]);
        // 初始化第一个
        tabsChange("推荐", 1);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    getEssayAll(); // 初始化
  }, []);

  const menu = (
    <Menu>
      <Menu.Item
        key="hot"
        icon={<FireTwoTone />}
        onClick={() => sorted("visit")}
      >
        按浏览量排序
      </Menu.Item>
      <Menu.Item
        key="new"
        icon={<DashboardTwoTone />}
        onClick={() => sorted("like")}
      >
        按点赞量排序
      </Menu.Item>
    </Menu>
  );

  const operations = (
    <Dropdown overlay={menu} placement="bottomLeft" arrow>
      <Button>排序</Button>
    </Dropdown>
  );

  // 排序
  const sorted = (key) => {
    let arr = [...essayList];
    if (key === "visit") {
      arr.sort((a, b) => {
        return b.visit_count - a.visit_count;
      });
    } else {
      arr.sort((a, b) => {
        return b.like_count - a.like_count;
      });
    }
    setEssayList([...arr]);
  };

  // 初始化，获取首页所有文章的分类
  useEffect(() => {
    async function getEssayAll() {
      try {
        setLoading(true);
        const res = await get_essay_all();
        const arr = res.data;
        setTabsList([...arr]);
        // 初始化第一个
        tabsChange("推荐", 1);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    getEssayAll(); // 初始化
  }, []);

  // 改变 tabs 时，根据key请求对应分类文章
  async function tabsChange(key, bool) {
    setLoading(true);
    let tabsId = null;

    // 如果是初始化，直接传id=1过去
    if (bool) {
      tabsId = 1;
    } else {
      tabsList.forEach((item) => {
        if (item.name === key) {
          // 切换到该tab，对这个板块的文章进行请求
          tabsId = item.id;
        }
      });
    }

    try {
      const res = await get_tabs_essay({ id: tabsId });
      let arr = res.data;
      arr.forEach((item) => {
        item.visit_count = parseInt(Math.random() * Math.random() * 1000); // 产生一个随机阅读量
        // 发布时间，将时间戳格式化为相对时间
        item.publish_time = item.publish_time
          ? formatDate(item.publish_time)
          : "时间数据有误";
      });
      setEssayList([...arr]);
      setLoading(false);
    } catch (err) {
      console.log(err);
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

  // 改变文章点赞状态
  async function changeLike(id, bool) {
    console.log(id, bool);
    const length = essayList.length;
    for (let i = 0; i < length; i++) {
      if (essayList[i].id === id) {
        // 找到这篇文章了
        try {
          if (bool) {
            // 点赞
            await like_essay({ id: id });
            essayList[i].is_like = true;
            essayList[i].like_count++;
          } else {
            // 取消点赞
            await dislike_essay({ id: id });
            essayList[i].is_like = false;
            essayList[i].like_count--;
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
    setEssayList([...essayList]);
  }

  // 改变文章收藏状态
  async function changeCollect(id, bool) {
    console.log(id, bool);
    const length = essayList.length;
    for (let i = 0; i < length; i++) {
      if (essayList[i].id === id) {
        // 找到这篇文章了
        try {
          if (bool) {
            // 收藏
            await collect_essay({ id: id });
            essayList[i].is_collect = true;
            essayList[i].collect_count++;
          } else {
            // 取消收藏
            await discollect_essay({ id: id });
            essayList[i].is_collect = false;
            essayList[i].collect_count--;
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
    setEssayList([...essayList]);
  }

  return (
    <SectionStyle>
      <div className="tab-flex">
        <Tabs onChange={tabsChange} tabBarExtraContent={operations}>
          <TabPane tab="推荐" key="推荐"></TabPane>
          <TabPane tab="前端" key="前端"></TabPane>
          <TabPane tab="后端" key="后端"></TabPane>
          <TabPane tab="Android" key="Android"></TabPane>
          <TabPane tab="iOS" key="iOS"></TabPane>
          <TabPane tab="人工智能" key="人工智能"></TabPane>
          <TabPane tab="开发工具" key="开发工具"></TabPane>
          <TabPane tab="代码人生" key="代码人生"></TabPane>
          <TabPane tab="阅读" key="阅读"></TabPane>
          <TabPane tab="其他" key="其他"></TabPane>
        </Tabs>
      </div>
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

                      {!item.is_like && (
                        <Space
                          className="hoverBlue"
                          onClick={() => changeLike(item.id, true)}
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
                          onClick={() => changeLike(item.id, false)}
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
                          onClick={() => changeCollect(item.id, true)}
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
                          onClick={() => changeCollect(item.id, false)}
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
              >
                <List.Item.Meta
                  avatar={
                    <Space className="essayAvatar">
                      <Avatar
                        src={
                          item.avatar_url
                            ? item.avatar_url
                            : require("../../assets/LoginOut.png")
                        }
                      />
                    </Space>
                  }
                  title={
                    <Space direction="vertical">
                      <Space className="essayHeader">
                        {item.username} | {item.publish_time} |{item.name}
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
