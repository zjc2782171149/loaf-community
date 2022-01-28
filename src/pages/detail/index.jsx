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
  collectArticle,
  digArticle,
  get_essay_detail,
  get__essay_status,
  get_user_follow,
  getThisUserArticleList
} from "../../service/detail.js";
import HotArticle from "./components/HotArticle";
import LeftSide from "./components/LeftSide";
import { DetailWrapper } from "./style";
// import { FocusAuthor } from "../../service/user";
import RenderIfVisible from "react-render-if-visible";

const { Meta } = Card;
// dayjs 配置
dayjs.locale("zh-cn"); // use locale
dayjs.extend(relativeTime);

// 采用 memo 对子组件重新渲染造成的影响进行控制
const Detail = () => {
  // 状态定义
  const { id } = useParams();
  const navigate = useNavigate();
  const [artLoading, setArtLoading] = useState(false); // 骨架屏显示
  const [article, setArticle] = useState({}); // 文章数据
  const [articleList, setArticleList] = useState([]); // 该用户发布的文章列表数据
  const [size, setSize] = useState(16); // 文章字体大小，默认16
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
          get__essay_status({ id: id })
        ];
        const resArticle = await Promise.all(requestArticle);
        const [resDetail, resStatus] = [resArticle[0], resArticle[1]];
        console.log(resDetail);
        console.log(resStatus);
        const { data: article, publish_user_id } = resDetail.data; // 抽离出文章详情、发布者id
        const { is_like, is_collect } = resStatus.data; // 我对文章的状态，是否点赞和收藏
        // 用发布者id去请求是否关注的状态
        const res = await get_user_follow();
        let flag = 0;
        res.data.forEach((item) => {
          if (item.id === publish_user_id) {
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
        // 根据上传时间设置到现在的时间
        article.publish_time = dayjs
          .unix(article.publish_time)
          .format("YYYY-MM-DD HH:mm");
        article.title = "测试标题测试标题测试标题测试标题测试标题测试标题";
        article.publish_time =
          "测试发布时间测试发布时间测试发布时间测试发布时间测试发布时间测试发布时间";
        article.content =
          "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试";
        setArticle(article);
        setArtLoading(false);
        /**
         * 上面是获取文章相关状态和该用户关注状态
         *
         * 下面是根据发布者id获取该发布者发布的其他文章
         */
        const userArticle = await getThisUserArticleList({
          id: publish_user_id
        });
        // 热门文章数据
        const articleList = userArticle.data.article_list;
        // 计算该用户发布的各文章到当前时间的距离
        articleList.forEach((article) => {
          article.publish_time = dayjs(
            parseInt(article.publish_time + "000")
          ).fromNow();
        });
        // 添加文章列表数据
        setArticleList(articleList);
      } catch (error) {
        // 获取失败直接返回首页
        message.error("加载失败，请重试");
        // navigate("/");
        setArtLoading(false);
      }
    };
    getArticle();
    return () => null;
  }, [id, navigate]);

  // 处理点赞事件
  const handleLove = () => {
    if (hasToken) {
      setNumGroup({
        ...numGroup,
        loveNum: numGroup.loveDone ? --numGroup.loveNum : ++numGroup.loveNum,
        loveDone: !numGroup.loveDone
      });
      digArticle({ article_id: article.item_id });
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
      collectArticle({ article_id: article.item_id });
    } else {
      message.info("请先登录");
    }
  };
  // 处理关注用户事件
  const focusUser = () => {
    if (hasToken) {
      if (numGroup.focus) {
        Modal.confirm({
          title: "你确定要取消关注作者吗？",
          onOk: () => {
            setNumGroup({
              ...numGroup,
              focus: !numGroup.focus
            });
            // FocusAuthor({ media_id: article.media_id });
          }
        });
      } else {
        setNumGroup({
          ...numGroup,
          focus: !numGroup.focus
        });
        // FocusAuthor({ media_id: article.media_id });
      }
    } else {
      message.info("请先登录");
    }
  };
  // 跳转评论区
  const handleComment = () => {
    const anchorElement = document.getElementById("comment");
    anchorElement.scrollIntoView({ block: "start", behavior: "smooth" });
  };
  // 切换字体大小
  const handleSize = (value) => {
    setSize(value);
    localStorage.setItem("fontSize", value);
  };

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
              size={size}
              handleCollect={handleCollect}
              handleComment={handleComment}
              handleLove={handleLove}
              handleSize={handleSize}
            />
            {/* 文章内容 */}
            <div className="main">
              <div className="article-container">
                {/* <h1 dangerouslySetInnerHTML={{ __html: article.title }} /> */}
                <h1>测试标题</h1>
                <div className="article-meta">
                  {/* <div className="article-time">{article.publish_time}</div> */}
                  <div className="article-time">3个月前</div>
                  <div className="article-author">
                    {article?.media_user?.media_name}{" "}
                  </div>
                </div>

                {/* <article dangerouslySetInnerHTML={{ __html: article.content }} /> */}
                <article>文章主要内容</article>
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
                onClick={() => {
                  navigate(`/user/${article.media_id}`);
                }}
                title={
                  <Space>
                    <Avatar
                      src={
                        article?.avatar_url
                          ? article?.avatar_url
                          : require("../../assets/zjtd.png")
                      }
                      size={50}
                    />
                    <Space
                      direction="vertical"
                      className="authorInfo"
                      size="small"
                    >
                      <span className="author-title">掘金安东尼</span>
                      <Space className="author-message">
                        <span>黄金矿工</span>
                        <span>@前端工程师</span>
                      </Space>
                    </Space>
                  </Space>
                }
                extra={
                  <Button
                    onClick={focusUser}
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
                    获得点赞{111}
                  </Space>

                  <Space size={5}>
                    <EyeTwoTone className="iconNum" />
                    文章被阅读{222}
                  </Space>
                  <Space size={5}>
                    <FireTwoTone className="iconNum" />
                    潜力值{333}
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
