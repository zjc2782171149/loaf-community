import React, { useState, useEffect } from "react";
import { SectionStyle } from "./section";

import {
  Avatar,
  Space,
  Skeleton,
  Card,
  Divider,
  Table,
  Tag,
  Popover,
  List
} from "antd";
import { createFromIconfontCN } from "@ant-design/icons";

const { Meta } = Card;

const LeetCodeSection = () => {
  const [user, setUser] = useState({});
  let loading = false;

  // 用户相关
  useEffect(() => {
    setUser({
      avatar_url: require("../../../assets/personalAvatar.jpg"),
      username: "Smooth",
      introduction: "一名SCAU大二前端er",
      is_done: 89,
      is_like: 122,
      is_collect: 30
    });
  }, []);

  // iconfont图标
  const IconFont = createFromIconfontCN({
    scriptUrl: "//at.alicdn.com/t/font_3155494_c8d2d91r6m.js"
  });

  // 表格要渲染的题目列表 数据和更新
  const [data, setData] = useState([]);
  useEffect(() => {
    const initData = [
      {
        id: 1,
        key: "1",
        title: "最小子数组",
        passing_rate: "70%",
        level: "medium",
        status: [false, false, true],
        url: ""
      },
      {
        id: 2,
        key: "2",
        title: "无重复字符的最长子串",
        passing_rate: "38.4%",
        level: "easy",
        status: [false, false, true],
        url: "https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/"
      },
      {
        id: 3,
        key: "3",
        title: "寻找两个正序数组的中位数",
        passing_rate: "41.1%",
        level: "hard",
        status: [true, true, false],
        url: "https://leetcode-cn.com/problems/median-of-two-sorted-arrays/"
      },
      {
        id: 4,
        key: "4",
        title: "寻找两个正序数组的中位数",
        passing_rate: "41.1%",
        level: "hard",
        status: [true, true, false],
        url: "https://leetcode-cn.com/problems/median-of-two-sorted-arrays/"
      },
      {
        id: 5,
        key: "5",
        title: "寻找两个正序数组的中位数",
        passing_rate: "41.1%",
        level: "hard",
        status: [true, true, false],
        url: "https://leetcode-cn.com/problems/median-of-two-sorted-arrays/"
      },
      {
        id: 6,
        key: "6",
        title: "寻找两个正序数组的中位数",
        passing_rate: "41.1%",
        level: "hard",
        status: [true, true, false],
        url: "https://leetcode-cn.com/problems/median-of-two-sorted-arrays/"
      },
      {
        id: 7,
        key: "7",
        title: "寻找两个正序数组的中位数",
        passing_rate: "41.1%",
        level: "hard",
        status: [true, true, false],
        url: "https://leetcode-cn.com/problems/median-of-two-sorted-arrays/"
      },
      {
        id: 8,
        key: "8",
        title: "寻找两个正序数组的中位数",
        passing_rate: "41.1%",
        level: "hard",
        status: [true, true, false],
        url: "https://leetcode-cn.com/problems/median-of-two-sorted-arrays/"
      },
      {
        id: 9,
        key: "9",
        title: "寻找两个正序数组的中位数",
        passing_rate: "41.1%",
        level: "hard",
        status: [true, true, false],
        url: "https://leetcode-cn.com/problems/median-of-two-sorted-arrays/"
      },
      {
        id: 10,
        key: "10",
        title: "寻找两个正序数组的中位数",
        passing_rate: "41.1%",
        level: "hard",
        status: [true, true, false],
        url: "https://leetcode-cn.com/problems/median-of-two-sorted-arrays/"
      },
      {
        id: 11,
        key: "11",
        title: "寻找两个正序数组的中位数",
        passing_rate: "41.1%",
        level: "hard",
        status: [true, true, false],
        url: "https://leetcode-cn.com/problems/median-of-two-sorted-arrays/"
      }
    ];
    setData(initData);
  }, []);

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
  function changeStatus(value, key, topic) {
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
    console.log(updated);
    setData(updated);
  }

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
          text: "easy",
          value: "easy"
        },
        {
          text: "medium",
          value: "medium"
        },
        {
          text: "hard",
          value: "hard"
        }
      ],
      onFilter: (value, record) => record.level.indexOf(value) === 0,
      render: (level) => (
        <span>
          {(level === "easy" && <Tag color="#00b6c3">{level}</Tag>) ||
            (level === "medium" && <Tag color="#ffb800">{level}</Tag>) ||
            (level === "hard" && <Tag color="#ff2d55">{level}</Tag>)}
        </span>
      )
    },
    {
      title: "状态",
      dataIndex: "status",
      filters: [
        {
          text: "未完成",
          value: false
        }
      ],
      onFilter: (value, record) => record.status[0] === value,
      render: (status, topic) => (
        <Space size="large">
          {/* index值：0为是否已做，1位是否已点赞，2位是否已收藏 */}
          {status.map((item, index) => {
            if (index === 0) {
              // 是否已完成该题目
              if (item === false) {
                return (
                  // 还没完成
                  <Popover content="待完成">
                    <IconFont
                      type="icon-weiwancheng-lanse"
                      className="iconfontBig"
                      onClick={() => changeDone(true, 0, topic)}
                    />
                  </Popover>
                );
              } else {
                return (
                  // 已完成
                  <Popover content="已完成">
                    <IconFont
                      type="icon-yiwancheng-lan"
                      className="iconfontBig"
                      onClick={() => {
                        changeDone(false, 0, topic);
                      }}
                    />
                  </Popover>
                );
              }
            } else if (index === 1) {
              // 是否已点赞该题目
              if (item === false) {
                return (
                  // 还没点赞
                  <Popover content="待点赞">
                    <IconFont
                      type="icon-dianzan"
                      className="iconfontBig"
                      onClick={() => {
                        changeLike(true, 1, topic);
                      }}
                    />
                  </Popover>
                );
              } else {
                return (
                  // 已点赞
                  <Popover content="已点赞">
                    <IconFont
                      type="icon-dianzanlanse"
                      className="iconfontBig"
                      onClick={() => {
                        changeLike(false, 1, topic);
                      }}
                    />
                  </Popover>
                );
              }
            } else {
              // 是否已收藏该题目
              if (item === false) {
                return (
                  // 还没收藏
                  <Popover content="待收藏">
                    <IconFont
                      type="icon-shoucang"
                      className="iconfontBig"
                      onClick={() => {
                        changeCollect(true, 2, topic);
                      }}
                    />
                  </Popover>
                );
              } else {
                return (
                  // 已收藏
                  <Popover content="已收藏">
                    <IconFont
                      type="icon-shoucanglan"
                      className="iconfontBig"
                      onClick={() => {
                        changeCollect(false, 2, topic);
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

  // 用于分页时触发
  function tableChange(e) {
    console.log(e);
  }

  return (
    <SectionStyle>
      <section className="section">
        <div className="left-aside">
          <div className="main">
            <div className="main-body">
              <Card className="leetCodeIntroduce" title="力扣专区介绍">
                <Space direction="vertical">
                  <p>1. 可以点击 状态 的三个按钮来设置完成、点赞、收藏状态</p>
                  <p>2. 可通过菜单右侧的按钮进行 难度 和 状态 的筛选</p>
                  <p>3. 可以点击链接跳到力扣页面进行刷题</p>
                </Space>
              </Card>
              <Table
                columns={columns}
                pagination={{ position: ["bottomCenter"] }}
                dataSource={data}
                onChange={tableChange}
                scrollToFirstRowOnChange="true"
              />
            </div>
          </div>
        </div>
        <div className="right-aside">
          {/* 个人信息展示 */}
          <Card
            className="right-aside-card"
            actions={[<text key="enter">进入主页</text>]}
            hoverable="true"
          >
            <Skeleton loading={loading} avatar active>
              <Meta
                avatar={<Avatar src={user.avatar_url} />}
                title={user.username}
                description={user.introduction}
              />
              <Divider />
              <Space direction="vertical">
                <Space size={10}>
                  <IconFont type="icon-yiwancheng-lan" className="iconNum" />
                  已完成题目数{user.is_done}
                </Space>

                <Space size={10}>
                  <IconFont type="icon-dianzanlanse" className="iconNum" />
                  已点赞题目数{user.is_like}
                </Space>
                <Space size={10}>
                  <IconFont type="icon-shoucanglan" className="iconNum" />
                  已收藏题目数{user.is_collect}
                </Space>
              </Space>
            </Skeleton>
          </Card>

          {/* 热题榜 */}
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
              dataSource={data.slice(3, 7)}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    (item.level === "easy" && (
                      <Tag color="#00b6c3">{item.level}</Tag>
                    )) ||
                      (item.level === "medium" && (
                        <Tag color="#ffb800">{item.level}</Tag>
                      )) ||
                      (item.level === "hard" && (
                        <Tag color="#ff2d55">{item.level}</Tag>
                      )),
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={item.url}
                      key="goLeetCode"
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
      </section>
    </SectionStyle>
  );
};

export default LeetCodeSection;
