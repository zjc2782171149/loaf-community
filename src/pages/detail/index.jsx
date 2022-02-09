// 文章详情
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Skeleton, Button, Modal, Card, Avatar, Space, Tag } from "antd";
import { HeartTwoTone, EyeTwoTone, FireTwoTone } from "@ant-design/icons";
import { throttle } from "lodash";
import {
  like_essay,
  dislike_essay,
  collect_essay,
  discollect_essay,
  get_essay_detail,
  get_essay_status
} from "../../service/detail.js";
import {
  get_user_info,
  get_publish_essay,
  set__user_follow,
  delete_user_follow,
  get_like_collect_num,
  get_which_user_follow
} from "../../service/user.js";
import { formatDate } from "../../utils/date.js";
import Comments from "../../components/Comments/index.jsx";
import HotArticle from "./components/HotArticle";
import LeftSide from "./components/LeftSide";
import { getScrollTop } from "../../utils/getScrollTop";
import { DetailWrapper } from "./style";
import RenderIfVisible from "react-render-if-visible";

const Detail = () => {
  // 状态定义
  const { id } = useParams(); // 从路由中读取文章id
  const [artLoading, setArtLoading] = useState(false); // 骨架屏显示
  const [author, setAuthor] = useState({}); // 文章数据
  const [article, setArticle] = useState({}); // 文章数据
  const [articleList, setArticleList] = useState([]); // 该用户发布的文章列表数据
  const [show, setShow] = useState(false); // 右侧粘性栏目是否显示
  const [statesGroup, setStatesGroup] = useState({
    loveNum: 0,
    commentNum: 0,
    collectNum: 0,
    loveDone: false,
    collect: false,
    focus: false,
    read: false
  });
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  // 初始化用户和文章数据
  useEffect(() => {
    const getArticle = async () => {
      setArtLoading(true);
      setArticleList([]);
      try {
        const requestArticle = [
          // 获取文章详情
          get_essay_detail({ id: id }),
          // 获取文章的点赞、收藏状态
          get_essay_status({ id: id })
        ];
        const resArticle = await Promise.all(requestArticle);
        const [resDetail, resStatus] = [resArticle[0], resArticle[1]];
        const { data: article } = resDetail; // 抽离出文章，给后面初始化，同步状态
        setArticle(resDetail.data); // 设置文章详情
        const { is_like, is_collect } = resStatus.data; // 我对文章的状态，是否点赞和收藏

        // 用发布者id去请求发布者详细信息
        const author = await get_user_info({ id: article.publish_user_id });
        setAuthor(author.data);

        // 用发布者id去请求发布者的总被点赞、收藏量
        const author_like_comment = await get_like_collect_num({
          id: article.publish_user_id
        });
        setAuthor({
          ...author.data,
          like_count: author_like_comment.data.like_count ?? 0,
          collect_count: author_like_comment.data.collect_count ?? 0
        });

        // 请求关注列表，看是否关注了这个作者
        const res = await get_which_user_follow({ id: userInfo.id });
        let flag = 0;
        res.data.forEach((item) => {
          if (item.id === article.publish_user_id) {
            flag = 1;
          }
        });
        const isFollow = flag === 1 ? true : false;

        // 存储文章点赞数据，点赞状态迁移
        setStatesGroup({
          loveNum: article.like_count,
          commentNum: article.comment_count,
          collectNum: article.collect_count,
          loveDone: is_like,
          collect: is_collect,
          focus: isFollow
        });
        setArticle(article);
        /**
         * 上面是获取文章相关状态和该用户关注状态
         */

        // 获取文章发布者的相关信息

        /**
         * 下面是根据发布者id获取该发布者发布的其他文章
         */
        const userArticle = await get_publish_essay({
          id: article.publish_user_id
        });
        // 添加热门文章数据
        setArticleList(userArticle.data);
        setArtLoading(false);
      } catch (error) {
        setArtLoading(false);
      }
    };
    getArticle();
  }, [id]);

  // 处理点赞事件
  const handleLove = () => {
    setStatesGroup({
      ...statesGroup,
      loveNum: statesGroup.loveDone
        ? --statesGroup.loveNum
        : ++statesGroup.loveNum,
      loveDone: !statesGroup.loveDone
    });
    if (statesGroup.loveDone) {
      // 取消点赞
      dislike_essay({ id: article.id });
    } else {
      // 点赞
      like_essay({ id: article.id });
    }
  };

  // 处理收藏事件
  const handleCollect = () => {
    setStatesGroup({
      ...statesGroup,
      collectNum: statesGroup.collect
        ? --statesGroup.collectNum
        : ++statesGroup.collectNum,
      collect: !statesGroup.collect
    });
    if (statesGroup.collect) {
      // 取消收藏
      discollect_essay({ id: article.id });
    } else {
      // 收藏
      collect_essay({ id: article.id });
    }
  };

  // 处理关注用户事件
  const focusUser = () => {
    try {
      if (statesGroup.focus) {
        Modal.confirm({
          title: "你确定要取消关注作者吗？",
          onOk: () => {
            delete_user_follow({ id: article.publish_user_id });
            setStatesGroup({
              ...statesGroup,
              focus: !statesGroup.focus
            });
          }
        });
      } else {
        set__user_follow({ id: article.publish_user_id });
        setStatesGroup({
          ...statesGroup,
          focus: !statesGroup.focus
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  // 跳转评论区
  const handleComment = (commentChild) => {
    // 更新评论数
    setStatesGroup({
      ...statesGroup,
      commentNum: commentChild
    });
    const anchorElement = document.getElementById("comment");
    anchorElement.scrollIntoView({ block: "start", behavior: "smooth" });
  };

  // 处理侧边栏定位
  let scrollTop = 0;
  // 获取距离顶部的距离
  const bindHandleScroll = throttle(() => {
    scrollTop = getScrollTop();
    // 大于一定距离后显示固定
    scrollTop >= 800 ? setShow(true) : setShow(false);
  }, 100);
  // 初始化滚动事件
  useEffect(() => {
    window.addEventListener("scroll", bindHandleScroll);
    return () => {
      window.removeEventListener("scroll", bindHandleScroll);
    };
  }, []);

  return (
    <DetailWrapper>
      <div className="essay">
        <div className="body">
          {/* 骨架屏加载 */}
          <Skeleton active loading={artLoading} paragraph={{ rows: 16 }} round>
            {/* 左侧交互按钮 */}

            <LeftSide
              className="left-sidebar"
              articleInfo={statesGroup}
              size={userInfo.font_size}
              handleCollect={handleCollect}
              handleComment={handleComment}
              handleLove={handleLove}
            />
            {/* 文章内容 */}
            <div className="main">
              <div className="article-container">
                <h2>{article.title}</h2>
                <Space className="article-meta">
                  {formatDate(article.publish_time)}
                  {author.username}
                </Space>

                <article
                  dangerouslySetInnerHTML={{
                    __html: article.content
                  }}
                />
              </div>
              {/* 评论区 */}
              <div id="comment" className="comment-container">
                <RenderIfVisible defaultHeight={200}>
                  <Comments
                    id={id}
                    type="essay"
                    commentNum={statesGroup.commentNum}
                    handleComment={handleComment}
                  ></Comments>
                </RenderIfVisible>
              </div>
            </div>
            {/* 右侧侧边栏 */}
            <div
              className={show ? "right-sidebar unShow" : "right-sidebar show"}
            >
              {/* 作者信息 */}
              <Card
                className="author"
                title={
                  <Space>
                    <Avatar
                      src={
                        author.avatar_url
                          ? author.avatar_url
                          : require("../../assets/LoginOut.png")
                      }
                      size={50}
                    />
                    <Space
                      direction="vertical"
                      className="authorInfo"
                      size="small"
                    >
                      <span className="author-title">{author.username}</span>
                      <Space className="author-message" direction="vertical">
                        <span>@{author.position}</span>
                        <span>{author.introduction}</span>
                      </Space>
                    </Space>
                  </Space>
                }
                extra={
                  <Button
                    onClick={() => focusUser()}
                    type="primary"
                    style={
                      statesGroup.focus
                        ? { backgroundColor: "#2ecc71", border: "none" }
                        : {}
                    }
                    className="author-love"
                  >
                    {statesGroup.focus ? "已关注" : "+ 关注"}
                  </Button>
                }
              >
                <Space direction="vertical">
                  <Space size={5}>
                    <HeartTwoTone className="iconNum" />
                    获得点赞{author.like_count}
                  </Space>
                  <Space size={5}>
                    <EyeTwoTone className="iconNum" />
                    文章被收藏{author.collect_count}
                  </Space>
                  <Space size={5}>
                    <FireTwoTone className="iconNum" />
                    潜力值{parseInt(Math.random() * Math.random() * 1000)}
                  </Space>
                </Space>
              </Card>
              {/* 右侧文章列表 */}
              <Skeleton
                active
                loading={!articleList}
                paragraph={{ rows: 16 }}
                round
              >
                <div className="hotArticle">
                  <Tag
                    color={
                      localStorage.getItem("userInfo")
                        ? JSON.parse(localStorage.getItem("userInfo"))
                            .theme_color
                        : "blue"
                    }
                    className="hotTitle"
                  >
                    作者热门文章
                  </Tag>
                  {/* 作者热门文章 */}
                  <HotArticle articleList={articleList} />
                </div>
              </Skeleton>
            </div>

            {/* 滚动时固定的右侧栏目 */}
            <div
              className={
                show
                  ? "right-sidebar-sticky show"
                  : "right-sidebar-sticky unShow"
              }
            >
              {/* 作者信息 */}
              <Card
                className="author"
                title={
                  <Space>
                    <Avatar
                      src={
                        author.avatar_url
                          ? author.avatar_url
                          : require("../../assets/LoginOut.png")
                      }
                      size={50}
                    />
                    <Space
                      direction="vertical"
                      className="authorInfo"
                      size="small"
                    >
                      <span className="author-title">{author.username}</span>
                      <Space className="author-message" direction="vertical">
                        <span>@{author.position}</span>
                        <span>{author.introduction}</span>
                      </Space>
                    </Space>
                  </Space>
                }
                extra={
                  <Button
                    onClick={() => focusUser()}
                    type="primary"
                    style={
                      statesGroup.focus
                        ? { backgroundColor: "#2ecc71", border: "none" }
                        : {}
                    }
                    className="author-love"
                  >
                    {statesGroup.focus ? "已关注" : "+ 关注"}
                  </Button>
                }
              >
                <Space direction="vertical">
                  <Space size={5}>
                    <HeartTwoTone className="iconNum" />
                    获得点赞{author.like_count}
                  </Space>
                  <Space size={5}>
                    <EyeTwoTone className="iconNum" />
                    文章被收藏{author.collect_count}
                  </Space>
                  <Space size={5}>
                    <FireTwoTone className="iconNum" />
                    潜力值{parseInt(Math.random() * Math.random() * 1000)}
                  </Space>
                </Space>
              </Card>
              {/* 右侧文章列表 */}
              <Skeleton
                active
                loading={!articleList}
                paragraph={{ rows: 16 }}
                round
              >
                <div className="hotArticle">
                  <Tag
                    color={
                      localStorage.getItem("userInfo")
                        ? JSON.parse(localStorage.getItem("userInfo"))
                            .theme_color
                        : "blue"
                    }
                    className="hotTitle"
                  >
                    作者热门文章
                  </Tag>
                  {/* 作者热门文章 */}
                  <HotArticle articleList={articleList} />
                </div>
              </Skeleton>
            </div>
          </Skeleton>
        </div>
      </div>
    </DetailWrapper>
  );
};

export default Detail;
