import React, { createElement, useState, useEffect, useCallback } from "react";
import {
  Comment,
  Form,
  Button,
  List,
  Input,
  message,
  Tooltip,
  Divider
} from "antd";
import { LikeOutlined, LikeFilled, DeleteOutlined } from "@ant-design/icons";
import {
  get_essay_comments,
  add_essay_comments,
  delete_essay_comments,
  like_essay_comments,
  dislike_essay_comments,
  get_topic_comments,
  add_topic_comments,
  delete_topic_comments,
  like_topic_comments,
  dislike_topic_comments
} from "../../service/comment";
import { CommentStyle, CommentReply } from "./style";
import "moment/locale/zh-cn";

const { TextArea } = Input;

const Comments = ({ id, type, commentNum, handleComment }) => {
  // 文章的评论数据
  const [data, setData] = useState([]); // 记录每一条评论的数据(非回复)
  const [likes, setLikes] = useState([]); // 记录每一条评论的点赞数(非回复)
  const [action, setAction] = useState([]); // 记录每一条评论是否进行了点赞，Boolean(非回复)
  const [commentId, setCommentID] = useState([]); // 记录每一条评论的id(非回复)
  const [userId, setUserId] = useState([]); // 记录每条评论发起者的用户id(非回复)
  const [replyNum, setReplyNum] = useState([]); // 记录每一条评论的回复数
  const [replyComments, setReplyComments] = useState([]); // 记录每一条评论的回复数组
  //是否提交
  const [submitting, setSubmit] = useState(false);
  //设置提交值
  const [value, setValue] = useState("");
  // 评论区数据
  const [comment_list, setComment_list] = useState([]);
  const [commentLoding, setCommentLoding] = useState(true);
  //评论总数
  const [comAll, setComAll] = useState(0);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  // 获取评论区总数据
  useEffect(() => {
    setCommentLoding(true);
    async function getCommentlist() {
      try {
        let res_comment;
        if (type === "essay") {
          res_comment = await get_essay_comments({
            id: id
          });
        } else {
          res_comment = await get_topic_comments({
            id: id
          });
        }

        setComment_list([...res_comment.data]);
      } catch (err) {
        console.log(err);
      }
    }
    getCommentlist();
  }, []);

  //初次渲染评论
  useEffect(() => {
    const all_comment = [];
    let commentAll = 0;
    if (comment_list) {
      setLikes([]);
      setAction([]);
      setData([]);
      setCommentID([]);
      setUserId([]);
      setReplyNum([]);
      setReplyComments([]);

      for (let i = 0; i < comment_list.length; i++) {
        //设置每一个动作为0
        likes.push(comment_list[i].like_count ?? 0);
        action.push(comment_list[i].is_like ?? false);
        commentId.push(comment_list[i].id);
        userId.push(comment_list[i].user_id);
        replyNum.push(comment_list[i].comment_count ?? 0);
        replyComments.push(comment_list[i].reply_comment);
        commentAll += comment_list[i].reply_comment.length;

        let each_comment = {
          actions: [
            //自定义评论组件
            <ExtraComment
              pinglunIndex={i}
              pinlun={comment_list[i].reply_comment}
              key={comment_list[i].id}
            ></ExtraComment>
          ],
          author: comment_list[i].username,
          avatar:
            comment_list[i].avatar_url ?? require("../../assets/LoginOut.png"),
          content: <span>{comment_list[i].content}</span>
        };
        all_comment.push(each_comment);
      }
    }
    commentNum = comment_list.length + commentAll;
    setComAll(comment_list.length + commentAll);
    setLikes([...likes]);
    setAction([...action]);
    setData([...all_comment]);
    setCommentID([...commentId]);
    setUserId([...userId]);
    setReplyNum([...replyNum]);
    setReplyComments([...replyComments]);
    setCommentLoding(false);
  }, [comment_list]);

  // comment下方的可操作按钮，点赞
  async function like(element) {
    //获取到标签下标
    const index = element.getAttribute("index");
    //如果点赞了，就加1，如果没有的话，就减-1
    if (action[index]) {
      // 点过赞，那现在就要取消
      likes[index]--;
      action[index] = false;
    } else {
      // 没点赞，准备点赞
      likes[index]++;
      action[index] = true;
    }
    //评论区对应的id
    let options = {
      id: commentId[index]
    };
    if (action[index]) {
      // 如果此时值是true，说明是false变为true，即进行点赞
      if (type === "essay") {
        await like_essay_comments(options);
      } else {
        await like_topic_comments(options);
      }
    } else {
      // 如果此时值是false，说明是true变为false，即进行取消点赞
      if (type === "essay") {
        await dislike_essay_comments(options);
      } else {
        await dislike_topic_comments(options);
      }
    }
    setLikes([...likes]);
    setAction([...action]);
  }

  // 对文章进行新增评论
  async function onSubmit() {
    if (value === "") {
      message.error("评论内容不能为空");
      return;
    }
    setCommentLoding(true);
    setComAll(comAll + 1); // 评论区总数量+1
    likes.unshift(0);
    setLikes([...likes]); // 点赞数初始化，为0
    replyNum.unshift(0);
    setReplyNum([...replyNum]); // 回复数初始化，为0
    action.unshift(false);
    setAction([...action]);
    replyComments.unshift([]);
    setReplyComments([...replyComments]);
    /**
     * 上面评论基本参数初始化完毕
     *
     * 下面进行api更新操作
     */
    let index = data.length;
    setValue("");
    try {
      let result;
      if (type === "essay") {
        result = await add_essay_comments({
          essay_id: Number(id),
          reply_comment_id: 0,
          content: value,
          reply_user_id: 0
        });
      } else {
        result = await add_topic_comments({
          topic_id: Number(id),
          reply_comment_id: 0,
          content: value,
          reply_user_id: 0
        });
      }
      commentId.unshift(result.data.id); // 返回评论id
      setCommentID([...commentId]);
      setSubmit(!submitting); // 将评论按钮设置为false

      // 要展现的评论的数据格式
      let newComment = {
        id: result.data.id,
        actions: [
          <ExtraComment
            pinglunIndex={index}
            key={index}
            pinlun={[]}
          ></ExtraComment>
        ],
        author: userInfo.username,
        avatar: userInfo.avatar_url ?? require("../../assets/LoginOut.png"),
        content: <span>{value}</span>
      };

      // 要存成api那样的评论数据格式，下面最终要渲染成上面的形式
      let essay_new_comment = {
        id: result.data.id,
        content: value,
        user_id: userInfo.user_id,
        username: userInfo.username,
        position: userInfo.position,
        avatar_url: userInfo.avatar_url,
        is_like: 0,
        like_count: 0,
        comment_count: 0,
        reply_comment: []
      };
      setData([newComment, ...data]); // 评论区数组压到第一位
      setComment_list([essay_new_comment, ...comment_list]);
      setComAll(++commentNum);
      if (type === "essay") {
        handleComment(commentNum); // 调用父组件传过来的函数进行更新父组件传给左侧的评论数
      }
      setCommentLoding(false);
    } catch (err) {
      setCommentLoding(false);
    }
  }

  //点赞的组件
  function Dianzan({ callback, dianzanProps }) {
    // id是每条评论内容，包括在评论区下标，和对应的回复数组
    useEffect(() => {
      setCommentLoding(false);
    }, [callback]);

    return (
      <>
        <Button
          type="text"
          icon={createElement(
            action[dianzanProps.pinglunIndex] === true
              ? LikeFilled
              : LikeOutlined
          )}
        />
        <span className="comment-action">
          {likes[dianzanProps.pinglunIndex]
            ? likes[dianzanProps.pinglunIndex]
            : 0}
        </span>
      </>
    );
  }

  //评论内容
  const ExtraComment = (props) => {
    const [val, setVal] = useState("");
    // 显示回复框
    const [isReply, setIsreply] = useState(false);
    // 点赞数量
    const [count, setCount] = useState(0);
    //显示回复评论内容
    // const [isReplyCon, setIsreplyCon] = useState(false);

    //评论回复列表
    const [replyList, setReplyList] = useState([]);
    // 存储点赞数量
    const callback = useCallback(() => {
      return count;
    }, [count]);

    // 每条评论的回复区进行初始化渲染
    useEffect(() => {
      const len = props.pinlun?.length;
      if (len) {
        for (let i = 0; i < len; i++) {
          let each_reply = {
            // 回复评论，是本人发送的评论，才渲染删除回复图标
            actions: [
              props.pinlun[i].user_id === userInfo.id && (
                <Tooltip
                  key={props.pinlun[i].id}
                  title="删除回复"
                  onClick={() =>
                    deleteReply({
                      comment_id: props.pinlun[i].reply_comment_id,
                      delete_comment_id: props.pinlun[i].id
                    })
                  }
                >
                  <DeleteOutlined />
                </Tooltip>
              )
            ],
            author: props.pinlun[i].username,
            avatar: props.pinlun[i].avatar_url,
            content: <p>{props.pinlun[i].content}</p>
          };
          replyList.push(each_reply);
        }
      }
      setReplyList([...replyList]);
    }, []);

    // 点击删除回复
    async function deleteReply({ comment_id, delete_comment_id }) {
      if (type === "essay") {
        await delete_essay_comments({ id: delete_comment_id });
      } else {
        await delete_topic_comments({ id: delete_comment_id });
      }
      let delete_index;
      comment_list.forEach((item) => {
        if (item.id === comment_id) {
          // 找到这个评论，接下来找要删除的回复
          item.reply_comment.forEach((item2, index) => {
            if (item2.id === delete_comment_id) {
              delete_index = index;
            }
          });
          // 删除该评论下的该回复
          item.reply_comment.splice(delete_index, 1);
        }
      });
      /**
       *
       * 下面重新渲染该评论的回复评论区域
       *
       */
      setReplyList([]);
      const arr = [];
      const replyListContent = comment_list[props.pinglunIndex].reply_comment;

      for (let i = 0; i < replyListContent.length; i++) {
        let each_reply = {
          //如果需要对评论回复进行回复和点赞等功能，可以在这里进行添加
          actions: [
            <Tooltip
              key={replyListContent[i].id}
              title="删除回复"
              onClick={() =>
                deleteReply({
                  comment_id: replyListContent[i].reply_comment_id,
                  delete_comment_id: replyListContent[i].id
                })
              }
            >
              <DeleteOutlined />
            </Tooltip>
          ],
          author: replyListContent[i].username,
          avatar: replyListContent[i].avatar_url,
          content: <span>{replyListContent[i].content}</span>
        };
        arr.push(each_reply);
      }
      replyNum[props.pinglunIndex]--;
      setReplyList([...arr]);
      setReplyNum([...replyNum]);
      setComAll(--commentNum);
      if (type === "essay") {
        handleComment(commentNum); // 调用父组件传过来的函数进行更新父组件传给左侧的评论数
      }
    }

    //点击回复评论
    async function commentReply() {
      if (val === "") {
        message.info("回复内容不能为空");
        return;
      }
      if (val !== "") {
        const which_user_reply_comment_id = userInfo.id; // 谁评论的，读取本地userInfo中的id即可
        let reply_which_comment_id = commentId[props.pinglunIndex]; // 当前评论的id

        // 调用接口去更新、添加评论
        let addReplyResult;
        if (type === "essay") {
          addReplyResult = await add_essay_comments({
            essay_id: Number(id),
            reply_comment_id: reply_which_comment_id,
            content: val,
            reply_user_id: which_user_reply_comment_id
          });
        } else {
          addReplyResult = await add_topic_comments({
            topic_id: Number(id),
            reply_comment_id: reply_which_comment_id,
            content: val,
            reply_user_id: which_user_reply_comment_id
          });
        }

        const res = addReplyResult;

        let each_reply = {
          actions: [
            <Tooltip
              key={res.data.id}
              title="删除回复"
              onClick={() =>
                deleteReply({
                  comment_id: reply_which_comment_id,
                  delete_comment_id: res.data.id
                })
              }
            >
              <DeleteOutlined />
            </Tooltip>
          ],
          author: userInfo.username,
          avatar: userInfo.avatar_url,
          content: <span>{val}</span>
        };
        replyList.unshift(each_reply);
        setReplyList([...replyList]);
        replyNum[props.pinglunIndex]++;
        setReplyNum([...replyNum]);
      }
      setComAll(++commentNum);
      if (type === "essay") {
        handleComment(commentNum); // 调用父组件传过来的函数进行更新父组件传给左侧的评论数
      }
      setVal("");
      setIsreply(false);
    }

    return (
      <div>
        <span
          onClick={(e) => {
            setCount(count + 1);
            like(e.currentTarget);
          }}
          index={props.pinglunIndex}
        >
          <Dianzan dianzanProps={props} callback={callback} />
        </span>
        <Button
          type="text"
          key="comment-list-reply-to-0"
          onClick={() => {
            setIsreply(!isReply);
          }}
        >
          回复
        </Button>
        <a>共有{replyNum[props.pinglunIndex] ?? 0}条回复</a>
        <CommentReply style={isReply ? {} : { display: "none" }}>
          <Form.Item className="reply">
            <TextArea
              rows={4}
              value={val}
              onChange={(event) => setVal(event.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              onClick={() => commentReply()}
              type="primary"
            >
              评论
            </Button>
          </Form.Item>
        </CommentReply>
        {/* 子评论区 */}
        {Boolean(replyList.length) && (
          <List
            className="comment-list"
            itemLayout="horizontal"
            dataSource={replyList}
            style={{ textAlign: "left" }}
            renderItem={(item) => (
              <Comment
                actions={item.actions}
                author={item.author}
                avatar={item.avatar ?? require("../../assets/LoginOut.png")}
                content={item.content}
              />
            )}
          />
        )}
      </div>
    );
  };

  return (
    <>
      <CommentStyle>
        <Divider />
        <Form.Item>
          <span className="commentTitle">评论</span>
        </Form.Item>
        <Form.Item>
          <TextArea
            rows={4}
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" onClick={() => onSubmit()} type="primary">
            评论
          </Button>
        </Form.Item>
      </CommentStyle>

      <List
        loading={commentLoding}
        className="comment-list"
        header={`共有${comAll}条评论`}
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <Comment
            actions={item.actions}
            author={item.author}
            avatar={item.avatar ?? require("../../assets/LoginOut.png")}
            content={item.content}
            datetime={item.publish_time}
          ></Comment>
        )}
      />
    </>
  );
};

export default Comments;
