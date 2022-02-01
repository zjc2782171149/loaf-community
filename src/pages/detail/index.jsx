// 文章详情
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import {
  Skeleton,
  Button,
  message,
  Modal,
  Card,
  Avatar,
  Space,
  Tag
} from "antd";
import { HeartTwoTone, EyeTwoTone, FireTwoTone } from "@ant-design/icons";
import Comments from "./components/Comments";
import {
  like_essay,
  collect_essay,
  get_essay_detail,
  get_essay_status,
  get_which_user_followed
} from "../../service/detail.js";
import {
  get_user_info,
  get_publish_essay,
  set__user_follow,
  delete_user_follow,
  set_user_setting
} from "../../service/user.js";
import { formatDate } from "../../utils/date.js";
// import Article from "./components/article/index.jsx";
import HotArticle from "./components/HotArticle";
import LeftSide from "./components/LeftSide";
import { DetailWrapper } from "./style";
import RenderIfVisible from "react-render-if-visible";

const { Meta } = Card;
// dayjs 配置
dayjs.locale("zh-cn"); // use locale
dayjs.extend(relativeTime);

const Detail = () => {
  // 状态定义
  const { id } = useParams(); // 从路由中读取文章id
  const navigate = useNavigate();
  const [artLoading, setArtLoading] = useState(false); // 骨架屏显示
  const [author, setAuthor] = useState({}); // 文章数据
  const [article, setArticle] = useState({}); // 文章数据
  const [articleList, setArticleList] = useState([]); // 该用户发布的文章列表数据
  const [hasToken, setHasToken] = useState(false);
  const [numGroup, setNumGroup] = useState({
    loveNum: 0,
    commentNum: 0,
    collectNum: 0,
    loveDone: false,
    collect: false,
    focus: false,
    read: false
  });
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );

  // 初始化文章数据
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
        console.log(resDetail);
        console.log(resStatus);
        const { data: article } = resDetail; // 抽离出文章，给后面初始化，同步状态
        setArticle(resDetail.data); // 设置文章详情
        const { is_like, is_collect } = resStatus.data; // 我对文章的状态，是否点赞和收藏

        const author = await get_user_info({ id: article.publish_user_id }); // 用发布者id去请求发布者详细信息
        setAuthor(author.data);
        const res = await get_which_user_followed({ id: userInfo.id }); // 请求关注列表，看是否关注了这个作者
        let flag = 0;
        res.data.forEach((item) => {
          if (item.id === article.publish_user_id) {
            flag = 1;
          }
        });
        const isFollow = flag === 1 ? true : false;
        // 存储文章点赞数据，点赞状态迁移
        setNumGroup({
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
        console.log(userArticle.data);
        // 添加热门文章数据
        setArticleList(userArticle.data);
        setArtLoading(false);
      } catch (error) {
        // 获取失败直接返回首页
        console.log(error);
        message.error("加载失败，请重试");
        // navigate("/");
        setArtLoading(false);
      }
    };
    getArticle();
  }, []);

  // 处理点赞事件
  const handleLove = () => {
    if (hasToken) {
      setNumGroup({
        ...numGroup,
        loveNum: numGroup.loveDone ? --numGroup.loveNum : ++numGroup.loveNum,
        loveDone: !numGroup.loveDone
      });
      like_essay({ id: article.id });
    } else {
      message.info("请先登录");
    }
  };
  // 处理收藏事件
  const handleCollect = () => {
    if (hasToken) {
      setNumGroup({
        ...numGroup,
        collectNum: numGroup.collect
          ? --numGroup.collectNum
          : ++numGroup.collectNum,
        collect: !numGroup.collect
      });
      collect_essay({ id: article.id });
    } else {
      message.info("请先登录");
    }
  };
  // 处理关注用户事件
  const focusUser = () => {
    try {
      if (numGroup.focus) {
        Modal.confirm({
          title: "你确定要取消关注作者吗？",
          onOk: () => {
            const res = delete_user_follow({ id: article.publish_user_id });
            console.log(res);
            setNumGroup({
              ...numGroup,
              focus: !numGroup.focus
            });
          }
        });
      } else {
        const res = set__user_follow({ id: article.publish_user_id });
        console.log(res);
        setNumGroup({
          ...numGroup,
          focus: !numGroup.focus
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  // 跳转评论区
  const handleComment = () => {
    const anchorElement = document.getElementById("comment");
    anchorElement.scrollIntoView({ block: "start", behavior: "smooth" });
  };
  // 切换字体大小
  async function handleSize(value) {
    try {
      await set_user_setting({
        theme_color: userInfo.theme_color,
        dark_mode: userInfo.dark_mode,
        font_size: value
      });
      const res = await get_user_info({ id: userInfo.id });
      localStorage.setItem("userInfo", JSON.stringify(res.data));
      setUserInfo(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  // 检查token状态，是否过期或不见了
  useEffect(() => {
    setHasToken(JSON.parse(localStorage.getItem("token")) ?? null);
  }, []);

  return (
    <DetailWrapper>
      <div className="essay">
        <div className="body">
          {/* 骨架屏加载 */}
          <Skeleton active loading={artLoading} paragraph={{ rows: 16 }} round>
            {/* 左侧交互按钮 */}

            <LeftSide
              articleInfo={numGroup}
              size={userInfo.font_size}
              handleCollect={handleCollect}
              handleComment={handleComment}
              handleLove={handleLove}
              handleSize={handleSize}
            />
            {/* 文章内容 */}
            <div className="main">
              <div className="article-container">
                <h2>{article.title}</h2>
                <Space className="article-meta">
                  {formatDate(article.publish_time)}
                  {author.username}
                </Space>
                {/* <Article content={article.content} /> */}

                <article
                  dangerouslySetInnerHTML={{
                    __html: article.content
                  }}
                />
              </div>
              {/* 评论区 */}
              <div id="comment" className="comment-container">
                <RenderIfVisible defaultHeight={200}>
                  <Comments id={id}></Comments>
                </RenderIfVisible>
              </div>
            </div>
            {/* 右侧侧边栏 */}
            <div className="right-sidebar">
              {/* 作者信息 */}
              <Card
                className="author"
                title={
                  <Space>
                    <Avatar
                      onClick={() => {
                        navigate(`/user/${article.publish_user_id}`);
                      }}
                      src={
                        author.avatar_url
                          ? author.avatar_url
                          : require("../../assets/LoginOut.png")
                      }
                      size={50}
                    />
                    <Space
                      onClick={() => {
                        navigate(`/user/${article.publish_user_id}`);
                      }}
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
                      numGroup.focus
                        ? { backgroundColor: "#2ecc71", border: "none" }
                        : {}
                    }
                    className="author-love"
                  >
                    {numGroup.focus ? "已关注" : "+ 关注"}
                  </Button>
                }
              >
                <Space direction="vertical">
                  <Space size={5}>
                    <HeartTwoTone className="iconNum" />
                    {/* 获得点赞{authorCount.data.like_count} */}
                    获得点赞{111}
                  </Space>

                  <Space size={5}>
                    <EyeTwoTone className="iconNum" />
                    {/* 文章被收藏{authorCount.data.collect_count} */}
                    文章被收藏{222}
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
                <Tag color="blue" className="hotTitle">
                  作者热门文章
                </Tag>
                {/* 作者热门文章 */}
                <HotArticle articleList={articleList} />
              </Skeleton>
              <div className="clearBgColor"></div>
              {/* 照片/广告 */}
              <Card
                className="author"
                hoverable="true"
                cover={
                  <img alt="example" src="https://joeschmoe.io/api/v1/random" />
                }
              >
                <Meta
                  title="广告位招租"
                  description="有需要的可以来找我们哈哈"
                />
              </Card>
            </div>
          </Skeleton>
        </div>
      </div>
    </DetailWrapper>
  );
};

export default Detail;
