import React, { useState } from "react";
import { SectionStyle } from "./section";
import { List, Avatar, Typography, Comment } from "antd";
import { LikeOutlined, LikeFilled } from "@ant-design/icons";
import { marked } from "marked";
import "antd/dist/antd.css";

const { Title } = Typography;

const Header = (props) => {
  return (
    <header className="header">
      <Title className="title">{props.essayTitle}</Title>
      <List
        dataSource={[props]}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.authorAvatarUrl} />}
              title={item.authorUsername}
              description={item.authorIntroduction}
            />
          </List.Item>
        )}
      />
    </header>
  );
};

const Section = (props) => {
  const [content, setContent] = useState(null);

  /**
   * TODO: 异步加载文章内容
   */
  (async () => {
    let response = await fetch(props.articleContent);
    let data = await response.text();
    setContent(data);
  })();

  return (
    <div className="rich-text-container">
      <div
        className="content"
        dangerouslySetInnerHTML={{
          __html: content ? marked(content) : null,
        }}
      />
    </div>
  );
};

const Actions = (props) => {
  const [liked, setLiked] = useState(false);

  const like = () => {
    setLiked(!liked);
  };

  return (
    <div className="rich-content-actions">
      <span className="like" onClick={like}>
        {React.createElement(liked ? LikeFilled : LikeOutlined)}
        <span className="action">{props.likes + (liked ? 1 : 0)}</span>
      </span>
    </div>
  );
};


const CommentArea = (props) => {

  const actions = [<span key="comment">评论</span>, <span key="delete">删除</span>];

  return (
    <List
      className="comment-list"
      header={`${props.data.length} 条评论`}
      itemLayout="horizontal"
      dataSource={props.data}
      renderItem={(item) => (
        
        // TODO: <li>没有添加key
        <li>
          <Comment
            actions={actions}
            author={item.username}
            avatar={item.user_avatar}
            content={item.content}
            datetime={item.datetime}
          />
        </li>
      )}
    />
  );
};


const EssaySection = () => {

  /**
   * 评论数据样本
   */
  const psuedoCommentData = [
    {
      id: 1, //话题id
      like_count: 6, //点赞数量
      is_like: true, //当前用户是否点赞过
      comment_count: 7, //评论数量
      user_id: 2,
      username: "这个是用户名",
      position: "xxx", //默认为空
      user_avatar: "https://joeschmoe.io/api/v1/random",
      content: "这是一条评论",
      reply_comment: [] //没有回复则为空数组
    }
  ];

  return (
    <SectionStyle>
      <section className="section">
        <div className="left-aside">
          <div className="main">
            <div className="main-body">
              <article>
                <Header
                  essayTitle="文章标题"
                  authorAvatarUrl="https://joeschmoe.io/api/v1/random"
                  authorUsername="用户名"
                  authorIntroduction="用户简介"
                />
                <Section articleContent={"http://localhost:3000/documentation.md"} />
                <div className="content-item-time">发布于2023-01-23 10:00</div>
                <Actions likes={1000} />
                <CommentArea data={psuedoCommentData} />
              </article>
            </div>
          </div>
        </div>
      </section>
    </SectionStyle>
  );
};

export default EssaySection;
