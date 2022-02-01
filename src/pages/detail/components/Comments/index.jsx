import React, { createElement, useState, useEffect, useCallback } from "react";
import { Comment, Form, Button, List, Input, message, Tooltip } from "antd";
// import moment from "moment";
import { LikeOutlined, LikeFilled, DeleteOutlined } from "@ant-design/icons";

import {
  get_essay_comments
  // add_essay_comments,
  // delete_comments,
  // like_essay_comments,
  // dislike_essay_comments
} from "../../../../service/comment";
import { CommentReply } from "./style";
import "moment/locale/zh-cn";
const { TextArea } = Input;
const Comments = ({ id }) => {
  console.log(id);
  // 是否登录
  const [hasToken, setHasToken] = useState(false);
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
  const [commentLoding, setLoding] = useState(true);
  //评论总数
  const [comAll, setComAll] = useState(0);
  //渲染得到评论

  // 获取评论区总数据
  useEffect(() => {
    const getCommentlist = async () => {
      const localToken = JSON.parse(localStorage.getItem("token")) ?? null;
      setHasToken(localToken);
      const res_comment = await get_essay_comments({
        id: id
      });
      console.log(res_comment);
      setComment_list(res_comment.data);
    };
    getCommentlist();
    const localToken = JSON.parse(localStorage.getItem("token")) ?? null;
    setHasToken(localToken);
  }, [id]);

  //初次渲染评论
  useEffect(() => {
    const all_comment = [];
    if (comment_list) {
      setLikes([]);
      setAction([]);
      setData([]);
      setCommentID([]);
      setUserId([]);
      setReplyNum([]);
      setReplyComments([]);
      console.log(comment_list.length);
      console.log(comment_list);
      for (let i = 0; i < comment_list.length; i++) {
        //设置每一个动作为0
        likes.push(comment_list?.[i].like_count);
        action.push(comment_list?.[i].is_like);
        commentId.push(comment_list?.[i].id);
        userId.push(comment_list?.[i].user_id);
        replyNum.push(comment_list?.[i].comment_count);
        replyComments.push(comment_list?.[i].reply_comment);
        console.log(comment_list?.[i].reply_comment);
        let each_comment = {
          actions: [
            //自定义评论组件
            <Pinglun
              a={i}
              pinlun={comment_list?.[i].reply_comment}
              key="1"
            ></Pinglun>
          ],
          author: comment_list?.[i].username,
          avatar: comment_list?.[i].avatar_url,
          content: <p>{comment_list?.[i].content}</p>
        };
        all_comment.push(each_comment);
      }
    }
    setLikes([...likes]);
    setAction([...action]);
    setData([...all_comment]);
    setCommentID([...commentId]);
    setUserId([...userId]);
    setReplyNum([...replyNum]);
    setReplyComments([...replyComments]);
  }, []);

  // comment下方的可操作按钮，点赞
  async function like(a) {
    // if (!hasToken) {
    //   message.info("请先登录");
    //   return;
    // }
    //获取到标签下标
    const index = a.getAttribute("index");
    console.log(a);
    console.log("点赞下标：", index);
    console.log(likes);
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
    console.log(likes);
    console.log(action);
    //评论区对应的id
    // let options = {
    //   id: commentId[index]
    // };
    // if (action[index]) {
    //   // 如果此时值是true，说明是false变为true，即进行点赞
    //   await like_essay_comments(options);
    // } else {
    //   // 如果此时值是false，说明是true变为false，即进行取消点赞
    //   await dislike_essay_comments(options);
    // }
    setLikes([...likes]);
    setAction([...action]);
  }

  // 对文章进行新增评论
  async function onSubmit() {
    // if (!hasToken) {
    //   message.info("请先登录");
    //   return;
    // }
    if (value === "") {
      setLoding(false);
      message.info("评论内容不能为空");
      return;
    }
    setComAll(comAll + 1); // 评论区总数量+1
    likes.push(0);
    setLikes([...likes]); // 点赞数初始化，为0
    replyNum.push(0);
    setReplyNum([...replyNum]); // 回复数初始化，为0
    action.push(false);
    setAction([...action]);
    setLoding(true);
    /**
     * 上面评论基本参数初始化完毕
     *
     * 下面进行api更新操作
     */
    let index = data.length;
    console.log(index);
    // let options = {
    //   essay_id: id,
    //   reply_comment_id: 0,
    //   content: value,
    //   reply_user_id: 0
    // };
    setValue("");
    let userInfo = JSON.parse(localStorage.getItem("userInfo")); //进行json解析
    userInfo = {
      username: "Smooth",
      avatar_url: require("../../../../assets/zjtd.png"),
      user_id: 1
    };
    // const result = await add_essay_comments(options);
    // commentId.push(result.data.id); // 返回评论id
    commentId.push(12); // 假数据
    setCommentID([...commentId]);
    setSubmit(!submitting); // 将评论按钮设置为false
    // 要展现的评论的数据格式
    let newComment = {
      actions: [<Pinglun a={index} key={index} pinlun={[]}></Pinglun>],
      author: userInfo?.username,
      avatar: userInfo?.avatar_url,
      content: <span>{value}</span>
    };
    // 要存成api那样的评论数据格式，下面最终要渲染成上面的形式
    let essay_new_comment = {
      id: 12,
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
    setComment_list([essay_new_comment, ...data]);
    setData([newComment, ...data]); // 评论区数组压到第一位
  }

  //点赞的组件
  function Dianzan({ callback, dianzanProps }) {
    // id是每条评论内容，包括在评论区下标，和对应的回复数组
    useEffect(() => {
      setLoding(false);
    }, [callback]);

    return (
      <>
        <Button
          type="text"
          icon={createElement(
            action[dianzanProps.a] === true ? LikeFilled : LikeOutlined
          )}
        />
        <span className="comment-action">
          {likes[dianzanProps.a] ? likes[dianzanProps.a] : 0}
        </span>
      </>
    );
  }

  //评论内容
  const Pinglun = (props) => {
    // console.log(props);
    console.log(hasToken);
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

    //回复区进行初始化渲染
    useEffect(() => {
      console.log(props.pinlun);
      if (props.pinlun.length) {
        for (let i = 0; i < props.pinlun.length; i++) {
          let each_reply = {
            //如果需要对评论回复进行回复和点赞等功能，可以在这里进行添加
            actions: [
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
            ],
            author: props.pinlun[i].username,
            avatar: props.pinlun[i].avatar_url,
            content: <p>{props.pinlun[i].content}</p>
          };
          replyList.push(each_reply);
        }
      }
      setReplyList([...replyList]);
    }, [props.pinlun, replyList, deleteReply]);

    //回复区进行渲染
    // function getReplyCom() {
    //   if (!hasToken) {
    //     message.info("请先登录");
    //     return;
    //   }
    //   const getReplyList = async () => {
    //     // 从接口获取真实数据并渲染
    //     // const essay_commentAll = await get_essay_comments({
    //     //   id: id
    //     // });
    //     // const essay_comment = essay_commentAll.data;
    //     // let replyListContent = [];
    //     // essay_comment.forEach((item) => {
    //     //   if (item.id === commentId[props.a]) {
    //     //     // 找到该评论，获取该评论的评论回复列表
    //     //     replyListContent = item.reply_comment;
    //     //   }
    //     // });

    //     // commentId[a.a]

    //     //评论回复列表
    //     let replyListContent = props.pinlun;
    //     if (replyListContent.length) {
    //       for (let i = 0; i < replyListContent.length; i++) {
    //         let each_reply = {
    //           //如果需要对评论回复进行回复和点赞等功能，可以在这里进行添加
    //           actions: [<Tooltip
    //             key={data.id}
    //             title="删除回复"
    //             onClick={() =>
    //               deleteReply({
    //               })
    //             }
    //           >
    //             <DeleteOutlined />
    //           </Tooltip>],
    //           author: replyListContent[i].user_info?.username,
    //           avatar: replyListContent[i].user_info?.avatar_url,
    //           content: <p>{replyListContent[i].content}</p>
    //         };
    //         replyList.push(each_reply);
    //       }
    //       setReplyList([...replyList]);
    //     }
    //   };
    //   getReplyList();
    // }

    // 点击删除回复
    const deleteReply = useCallback(
      ({ comment_id, delete_comment_id }) => {
        // await delete_comments({ id: delete_comment_id });
        console.log(comment_id, delete_comment_id);
        console.log(comment_list);
        let delete_index;
        comment_list.forEach((item) => {
          if (item.id === comment_id) {
            // 找到这个评论，接下来找要删除的回复
            item.reply_comment.forEach((item2, index) => {
              if (item2.id === delete_comment_id) {
                console.log(item2, index);
                delete_index = index;
              }
            });
            // 删除该评论下的该回复
            item.reply_comment.splice(delete_index, 1);
          }
        });
        // console.log(comment_list);
        /**
         *
         * 下面重新渲染该评论的回复评论区域
         *
         */
        setReplyList([]);
        const arr = [];
        console.log(comment_list);
        console.log(comment_list[props.a]);
        const replyListContent = comment_list[props.a]?.reply_comment;

        for (let i = 0; i < replyListContent.length; i++) {
          let each_reply = {
            //如果需要对评论回复进行回复和点赞等功能，可以在这里进行添加
            actions: [
              <Tooltip
                key={data.id}
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
            content: <p>{replyListContent[i].content}</p>
          };
          arr.push(each_reply);
        }
        replyNum[props.a]--;
        setReplyList([...arr]);
        setReplyNum([...replyNum]);
      },
      [props.a]
    );

    //点击回复评论
    async function commentReply() {
      // console.log(val)
      // if (!hasToken) {
      //   message.info("请先登录");
      //   return;
      // }
      if (val === "") {
        message.info("回复内容不能为空");
        return;
      }
      if (val !== "") {
        let userInfo = JSON.parse(localStorage.getItem("userInfo")); //进行json解析
        console.log(userInfo);
        // const which_user_reply_comment_id = userInfo.id; // 谁评论的，读取本地userInfo中的id即可
        const which_user_reply_comment_id = 3;
        let reply_which_comment_id = commentId[props.a]; // 当前评论的id
        console.log(reply_which_comment_id, which_user_reply_comment_id);
        console.log(comment_list);
        // 调用接口去更新、添加评论
        // const addReplyResult = await add_essay_comments({
        //   essay_id: id,
        //   reply_comment_id: reply_which_comment_id,
        //   content: val,
        //   reply_user_id: which_user_reply_comment_id
        // });
        // const { data } = addReplyResult;
        const data = { id: 42 };
        userInfo = {
          username: "Smooth",
          avatar: require("../../../../assets/zjtd.png")
        };
        let each_reply = {
          actions: [
            <Tooltip
              key={data.id}
              title="删除回复"
              onClick={() =>
                deleteReply({
                  comment_id: reply_which_comment_id,
                  delete_comment_id: data.id
                })
              }
            >
              <DeleteOutlined />
            </Tooltip>
          ],
          author: userInfo.username,
          avatar: userInfo.avatar_url,
          content: <p>{val}</p>
        };
        replyList.unshift(each_reply);
        setReplyList([...replyList]);
        replyNum[props.a]++;
        setReplyNum([...replyNum]);
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
          index={props.a}
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
        <a>共有{replyNum[props.a] ? replyNum[props.a] : 0}条回复</a>

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
            // loading={isReplyLoading}
            className="comment-list"
            itemLayout="horizontal"
            dataSource={replyList}
            style={{ textAlign: "left" }}
            renderItem={(item) => (
              <li>
                <Comment
                  actions={item.actions}
                  author={item.author}
                  avatar={item.avatar}
                  content={item.content}
                />
              </li>
            )}
          />
        )}
      </div>
    );
  };

  return (
    <>
      <>
        <Form.Item>
          <TextArea
            rows={4}
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" onClick={onSubmit} type="primary">
            {/* <Button htmlType="submit" onClick={() => setData()} type="primary"> */}
            评论
          </Button>
        </Form.Item>
      </>

      <List
        loading={commentLoding}
        className="comment-list"
        style={{ textAlign: "left" }}
        header={`共有${comAll}条评论`}
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <li>
            <Comment
              actions={item.actions}
              author={item.author}
              avatar={item.avatar}
              content={item.content}
              datetime={item.datetime}
            ></Comment>
          </li>
        )}
      />
    </>
  );
};

export default Comments;
