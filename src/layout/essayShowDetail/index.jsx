import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { SectionStyle } from "./style";
import {
  get_user_info,
  get_essay_all,
  get_tabs_essay,
  get_essay_detail,
  get_essay_status,
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
    let flag = 0,
      tabsId = null;
    console.log(key, bool);
    // 如果是初始化，直接传id=1过去
    if (bool) {
      tabsId = 1;
      flag = 1;
    } else {
      tabsList.forEach((item) => {
        if (item.name === key) {
          // 切换到该tab，对这个板块的文章进行请求
          tabsId = item.id;
          flag = 1;
        }
      });
    }

    if (flag) {
      // 如果找到该 板块，进行请求
      try {
        const res = await get_tabs_essay({ id: tabsId });
        let arr = res.data;
        console.log(arr);

        // 由于api在上面返回的数据中还没四个数量和 点赞收藏状态，还得分别再进行两个api的申请
        const length = arr.length;
        for (let i = 0; i <= length; i++) {
          // 跳出循环
          if (i === length) {
            setLoading(false);
            break;
          }
          const requestEssay = [
            // 获取文章详情
            get_essay_detail({ id: arr[i].id }),
            // 获取文章的点赞、收藏状态
            get_essay_status({ id: arr[i].id })
          ];
          console.log(arr[i].id);
          // 进行请求
          const res = await Promise.all(requestEssay);
          console.log(res);
          const [resDetail, resStatus] = [res[0], res[1]];
          const { name, like_count, collect_count, comment_count } =
            resDetail.data; // 抽离出发布者
          const { is_like, is_collect } = resStatus.data; // 我对文章的状态，是否点赞和收藏
          // 再根据每篇文章 发布者ID，去查找发布者姓名
          const resUser = await get_user_info({ id: arr[i].publish_user_id });
          console.log(arr[i]);
          arr[i].like_count = like_count ? like_count : 0;
          arr[i].collect_count = collect_count ? collect_count : 0;
          arr[i].comment_count = comment_count ? comment_count : 0;
          arr[i].visit_count = parseInt(Math.random() * Math.random() * 1000); // 产生一个随机阅读量
          arr[i].is_like = is_like;
          arr[i].is_collect = is_collect;
          // 发布时间，将时间戳格式化为相对时间
          arr[i].publish_time = arr[i].publish_time
            ? moment(formatDate(formatDate(arr[i].publish_time)), "YYYYMMDD")
                .startOf("day")
                .fromNow()
            : "时间数据有误";
          arr[i].avatar_url = arr[i].avatar_url
            ? arr[i].avatar_url
            : require("../../assets/LoginOut.png");
          arr[i].username = resUser.data.username;
          arr[i].name = name ? name : "无";
          console.log(arr[i]);
          setEssayList([...arr]);
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    } else {
      // 没找到，进行清空
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

  // 改变文章点赞状态
  async function changeLike(id, bool) {
    console.log(id, bool);
    const length = essayList.length;
    for (let i = 0; i < length; i++) {
      if (essayList[i].id === id) {
        // 找到这篇文章了
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
                      <Avatar src={item.avatar_url} />
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
