import React, { useState, useEffect } from "react";
import { Space, Card, Table, Tag, Popover, Spin } from "antd";
import { createFromIconfontCN } from "@ant-design/icons";
import {
  get_leetCode_all,
  get_leetCode_detail,
  done_leetCode,
  disdone_leetCode,
  like_leetCode,
  dislike_leetCode,
  collect_leetCode,
  discollect_leetCode
} from "../../service/leetCode";
import { LeetCodeStyle, LeftSideStyle, RightSideStyle } from "./leetCode";
import Self from "./components/Self/index.jsx";
import HotTopic from "./components/HotTopic/index.jsx";

const { Meta } = Card;

const LeetCode = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [doneNum, setDoneNum] = useState(0);
  const [likeNum, setLikeNum] = useState(0);
  const [collectNum, setCollectNum] = useState(0);

  // 力扣题目信息初始化
  useEffect(() => {
    async function initLeetcode() {
      setLoading(true);
      try {
        const res = await get_leetCode_all();
        initLeetcodeDetail(res.data);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }
    initLeetcode();
  }, []);

  // 各题目完成、点赞、收藏状态初始化
  async function initLeetcodeDetail(list) {
    try {
      const len = list.length;
      for (let i = 0; i < len; i++) {
        const res = await get_leetCode_detail({ id: list[i].id });
        list[i].key = list[i].id;
        list[i].passing_rate = list[i].passing_rate + "%";
        list[i].status = [];
        list[i].status.push(
          res.data.is_done,
          res.data.is_like,
          res.data.is_collect
        );
      }
      setData([...list]);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  // iconfont图标
  const IconFont = createFromIconfontCN({
    scriptUrl: "//at.alicdn.com/t/font_3155494_c8d2d91r6m.js"
  });

  // 表格数据
  const columns = [
    {
      title: "题目",
      dataIndex: "title",
      render: (text) => <>{text}</>
    },
    {
      title: "通过率",
      dataIndex: "passing_rate"
    },
    {
      title: "难度",
      dataIndex: "level",
      filters: [
        {
          text: "简单",
          value: "简单"
        },
        {
          text: "中等",
          value: "中等"
        },
        {
          text: "困难",
          value: "困难"
        }
      ],
      onFilter: (value, record) => record.level.indexOf(value) === 0,
      render: (level) => (
        <span>
          {(level === "简单" && <Tag color="#00b6c3">{level}</Tag>) ||
            (level === "中等" && <Tag color="#ffb800">{level}</Tag>) ||
            (level === "困难" && <Tag color="#ff2d55">{level}</Tag>)}
        </span>
      )
    },
    {
      title: "状态",
      dataIndex: "status",
      filters: [
        {
          text: "未完成",
          value: 0
        },
        {
          text: "已完成",
          value: 1
        }
      ],
      onFilter: (value, record) => record.status[0] === value,
      render: (status, topic) => (
        <Space size="large">
          {/* index值：0为是否已做，1位是否已点赞，2位是否已收藏 */}
          {status.map((item, index) => {
            if (index === 0) {
              // 是否已完成该题目
              if (item === 0) {
                return (
                  // 还没完成
                  <Popover content="待完成" key={index}>
                    <IconFont
                      type="icon-weiwancheng-lanse"
                      className="iconfontBig"
                      onClick={() => changeDone(1, 0, topic)}
                    />
                  </Popover>
                );
              } else {
                return (
                  // 已完成
                  <Popover content="已完成" key={index}>
                    <IconFont
                      type="icon-yiwancheng-lan"
                      className="iconfontBig"
                      onClick={() => {
                        changeDone(0, 0, topic);
                      }}
                    />
                  </Popover>
                );
              }
            } else if (index === 1) {
              // 是否已点赞该题目
              if (item === 0) {
                return (
                  // 还没点赞
                  <Popover content="待点赞" key={index}>
                    <IconFont
                      type="icon-dianzan"
                      className="iconfontBig"
                      onClick={() => {
                        changeLike(1, 1, topic);
                      }}
                    />
                  </Popover>
                );
              } else {
                return (
                  // 已点赞
                  <Popover content="已点赞" key={index}>
                    <IconFont
                      type="icon-dianzanlanse"
                      className="iconfontBig"
                      onClick={() => {
                        changeLike(0, 1, topic);
                      }}
                    />
                  </Popover>
                );
              }
            } else {
              // 是否已收藏该题目
              if (item === 0) {
                return (
                  // 还没收藏
                  <Popover content="待收藏" key={index}>
                    <IconFont
                      type="icon-shoucang"
                      className="iconfontBig"
                      onClick={() => {
                        changeCollect(1, 2, topic);
                      }}
                    />
                  </Popover>
                );
              } else {
                return (
                  // 已收藏
                  <Popover content="已收藏" key={index}>
                    <IconFont
                      type="icon-shoucanglan"
                      className="iconfontBig"
                      onClick={() => {
                        changeCollect(0, 2, topic);
                      }}
                    />
                  </Popover>
                );
              }
            }
          })}
        </Space>
      )
    },
    {
      title: "链接",
      dataIndex: "url",
      render: (url) => (
        <a target="_blank" rel="noreferrer" href={url}>
          去完成
        </a>
      )
    }
  ];

  // 改变题目完成状态
  function changeDone(value, key, topic) {
    // 改变该题目的值
    console.log(value, key, topic);
    changeStatus(value, key, topic); // 这里传的0，代表修改完成状态
  }
  // 改变题目点赞状态
  function changeLike(value, key, topic) {
    console.log(value, key, topic);
    changeStatus(value, key, topic); // 这里传的1，代表修改点赞状态
  }
  // 改变题目收藏状态
  function changeCollect(value, key, topic) {
    console.log(value, key, topic);
    changeStatus(value, key, topic); // 这里传的1，代表修改收藏状态
  }
  // 改变
  async function changeStatus(value, key, topic) {
    console.log(value, key, topic);
    try {
      if (key === 0) {
        // 改变完成
        if (value === 1) {
          // 完成
          await done_leetCode({ id: topic.id });
          setDoneNum(1);
        } else {
          await disdone_leetCode({ id: topic.id });
          setDoneNum(-1);
        }
      } else if (key === 1) {
        // 改变点赞
        if (value === 1) {
          // 点赞
          await like_leetCode({ id: topic.id });
          setLikeNum(1);
        } else {
          await dislike_leetCode({ id: topic.id });
          setLikeNum(-1);
        }
      } else {
        // 改变收藏
        if (value === 1) {
          // 收藏
          await collect_leetCode({ id: topic.id });
          setCollectNum(1);
        } else {
          await discollect_leetCode({ id: topic.id });
          setCollectNum(-1);
        }
      }
      topic.status[key] = value;
      let updated = [...data],
        deleteIndex;
      updated.forEach((item, index) => {
        if (item.id === topic.id) {
          deleteIndex = index; // 记录下要移出的题目的下标
        }
      });
      updated.splice(deleteIndex, 1); // 删除原题目
      updated.splice(deleteIndex, 0, topic); // 加回改变状态后的原题目
      setData(updated);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <LeetCodeStyle>
      <div className="leetcode">
        <LeftSideStyle>
          <div className="left-aside">
            <div className="main">
              <Card className="leetCodeIntroduce" title="力扣专区介绍">
                <Space direction="vertical">
                  <p>1. 可以点击 状态 的三个按钮来设置完成、点赞、收藏状态</p>
                  <p>2. 可通过菜单右侧的按钮进行 难度 和 状态 的筛选</p>
                  <p>3. 可以点击链接跳到力扣页面进行刷题</p>
                </Space>
              </Card>
              <Spin spinning={loading} tip="题目正在加载中...">
                <Table
                  columns={columns}
                  pagination={{ position: ["bottomCenter"] }}
                  dataSource={data}
                  scrollToFirstRowOnChange="true"
                />
              </Spin>
            </div>
          </div>
        </LeftSideStyle>
        <RightSideStyle>
          <div className="right-aside">
            {/* 个人信息展示 */}
            <Self doneNum={doneNum} likeNum={likeNum} collectNum={collectNum} />

            {/* 热题榜 */}
            <HotTopic data={data} />

            {/* 照片/广告 */}
            <Card
              className="right-aside-card"
              hoverable="true"
              cover={
                <img alt="example" src="https://joeschmoe.io/api/v1/random" />
              }
            >
              <Meta title="广告位招租" description="有需要的可以来找我们哈哈" />
            </Card>
          </div>
        </RightSideStyle>
      </div>
    </LeetCodeStyle>
  );
};

export default LeetCode;
