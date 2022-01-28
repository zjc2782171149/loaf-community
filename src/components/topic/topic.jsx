import React, { useState, useEffect } from "react";
import { SectionStyle } from "./topic";
import {
  List,
  Space,
  Card,
  Skeleton,
  Avatar,
  Button,
  Input,
  Comment,
  Tooltip,
  Divider,
  message
} from "antd";
import {
  ShareAltOutlined,
  MessageOutlined,
  PlusOutlined,
  TwitterOutlined,
  LikeOutlined,
  LikeFilled
  // LikeOutlined
} from "@ant-design/icons";
import moment from "moment";

const { Meta } = Card;
const { TextArea } = Input;

const TopicSection = () => {
  // const [loading, setLoading] = useState(true);

  const announcementList = [
    {
      title: "【好题分享活动】开奖啦~",
      description: "2022/01/17"
    },
    {
      title: "【笔记创作活动】已开启，超值礼品等…",
      description: "2022/01/17"
    },
    {
      title: "青训营社区|意见&建议反馈收集",
      description: "2022/01/15"
    },
    {
      title: "关于我们(bug生产队)",
      description: "2022/02/10"
    }
  ];

  const [likes, setLikes] = useState(0);
  const [action, setAction] = useState(null);

  function like() {
    console.log("点赞", likes);
    setLikes(1);
    setAction(1);
  }

  // 嵌套评论
  const ExampleComment = ({
    actions,
    author,
    avatar,
    content,
    datetime,
    childrenn
  }) => (
    <Comment
      actions={actions}
      author={<a>{author}</a>}
      avatar={<Avatar src={avatar} alt="Han Solo" />}
      content={<>{content}</>}
      datetime={datetime}
    >
      {childrenn && (
        <List
          className="comment-list"
          itemLayout="horizontal"
          dataSource={childrenn}
          renderItem={(item) => (
            <li>
              <Comment
                actions={item.actions}
                author={<a>{item.author}</a>}
                avatar={<Avatar src={item.avatar} alt="Han Solo" />}
                content={<>{item.content}</>}
                datetime={item.datetime}
              ></Comment>
            </li>
          )}
        />
      )}
    </Comment>
  );

  // 评论回复的antd组件
  const [comments, setComments] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  // 初始化评论数据，假数据
  useEffect(() => {
    setComments([
      {
        actions: [
          <Tooltip key="comment-basic-like" title="Like">
            <span onClick={like(1)}>
              {action && <LikeFilled />}
              {!action && <LikeOutlined />}
              <span className="comment-action">{likes}</span>
            </span>
          </Tooltip>,
          <span key="comment-basic-reply-to">Reply to</span>
        ],
        author: "Han Solo",
        avatar: "https://joeschmoe.io/api/v1/random",
        content: (
          <p>
            We supply a series of design principles, practical patterns and high
            quality design resources (Sketch and Axure), to help people create
            their product prototypes beautifully and efficiently.
          </p>
        ),
        datetime: (
          <Tooltip
            title={moment().subtract(1, "days").format("YYYY-MM-DD HH:mm:ss")}
          >
            <span>{moment().subtract(1, "days").fromNow()}</span>
          </Tooltip>
        ),
        childrenn: [
          {
            actions: [
              <Tooltip key="comment-basic-like" title="Like">
                <span onClick={like(2)}>
                  {action && <LikeFilled />}
                  {!action && <LikeOutlined />}
                  <span className="comment-action">{likes}</span>
                </span>
              </Tooltip>,
              <span key="comment-basic-reply-to">Reply to</span>
            ],
            author: "Han Solo",
            avatar: "https://joeschmoe.io/api/v1/random",
            content: (
              <p>
                We supply a series of design principles, practical patterns and
                high quality design resources (Sketch and Axure), to help people
                create their product prototypes beautifully and efficiently.
              </p>
            ),
            datetime: (
              <Tooltip
                title={moment()
                  .subtract(1, "days")
                  .format("YYYY-MM-DD HH:mm:ss")}
              >
                <span>{moment().subtract(1, "days").fromNow()}</span>
              </Tooltip>
            )
          },
          {
            actions: [
              <Tooltip key="comment-basic-like" title="Like">
                <span onClick={like(3)}>
                  {action && <LikeFilled />}
                  {!action && <LikeOutlined />}
                  <span className="comment-action">{likes}</span>
                </span>
              </Tooltip>,
              <span key="comment-basic-reply-to">Reply to</span>
            ],
            author: "Han Solo",
            avatar: "https://joeschmoe.io/api/v1/random",
            content: (
              <p>
                We supply a series of design principles, practical patterns and
                high quality design resources (Sketch and Axure), to help people
                create their product prototypes beautifully and efficiently.
              </p>
            ),
            datetime: (
              <Tooltip
                title={moment()
                  .subtract(1, "days")
                  .format("YYYY-MM-DD HH:mm:ss")}
              >
                <span>{moment().subtract(1, "days").fromNow()}</span>
              </Tooltip>
            )
          }
        ]
      }
    ]);
  }, []);

  // 发表评论
  const [textValue, setTextValue] = useState("");
  // 设置value值
  function handleChange(e) {
    console.log(e.target.value);
    setTextValue(e.target.value);
  }
  // 发送评论
  function sendComment() {
    console.log("textValue值为：" + textValue);
    if (!textValue) {
      console.log("textValue值为：" + textValue);
      return;
    }

    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setTextValue("");
      setComments([
        ...comments,
        {
          author: "Han Solo",
          avatar: "https://joeschmoe.io/api/v1/random",
          content: <p>{textValue}</p>,
          datetime: moment().fromNow()
        }
      ]);
    }, 1000);
    setTimeout(() => {
      message.success({ content: "恭喜您，评论成功!", duration: 3 });
    }, 1000);
  }

  return (
    <SectionStyle>
      <section className="section">
        <div className="left-aside">
          <div className="main">
            <div className="main-header">
              <div className="main-body">
                {/* 话题详情 */}
                <Card
                  bordered={false}
                  actions={[
                    <Space key="1">
                      <ShareAltOutlined />
                      分享
                    </Space>,
                    <Space key="comment">
                      <MessageOutlined />
                      评论
                    </Space>
                  ]}
                  key={"13fsadasdsa"}
                >
                  <Skeleton loading={false} avatar active>
                    <Meta
                      avatar={
                        <Avatar
                          src={require("../../assets/personalAvatar.jpg")}
                        />
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
                          <Button
                            type="primary"
                            className="concernButton"
                            icon={<PlusOutlined />}
                          >
                            关注
                          </Button>
                        </>
                      }
                      description={"13fsadasdsa"}
                    />
                  </Skeleton>
                </Card>
              </div>
            </div>
          </div>
          {/* 发表评论 */}
          <div className="send">
            <p className="title">评论</p>
            <Card bordered={false}>
              <Skeleton loading={false} avatar active>
                <Space>
                  <Meta
                    avatar={
                      <Avatar
                        src={require("../../assets/personalAvatar.jpg")}
                      />
                    }
                    title={
                      <>
                        <TextArea
                          className="textarea"
                          value={textValue}
                          onChange={handleChange}
                          maxLength={100}
                          allowClear="true"
                          rows={3}
                          placeholder="快来发表你尊贵的评论吧！"
                        />
                        <Button
                          type="primary"
                          className="sendComment"
                          icon={<TwitterOutlined />}
                          onClick={() => {
                            sendComment();
                          }}
                          loading={submitting}
                        >
                          发送
                        </Button>
                      </>
                    }
                  />
                </Space>
              </Skeleton>
            </Card>
          </div>
          {/* 评论区 */}
          <div className="commentArea" direction="vertical">
            <p className="title">全部评论</p>
            <List
              className="comment-list"
              header={`${comments.length} 评论`}
              itemLayout="horizontal"
              dataSource={comments}
              renderItem={(item) => (
                <li>
                  <ExampleComment
                    actions={item.actions}
                    author={item.author}
                    avatar={item.avatar}
                    content={item.content}
                    datetime={item.datetime}
                    childrenn={item.childrenn}
                  />
                </li>
              )}
            />

            <Divider />
          </div>
        </div>
        <div className="right-aside">
          {/* 公告栏 */}
          <Card className="right-aside-card" title="相关推荐" hoverable="true">
            <List
              className="content-list"
              loadMore={true}
              itemLayout="horizontal"
              dataSource={announcementList}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={<a href="">{item.title}</a>}
                    description={item.description}
                  />
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

export default TopicSection;
