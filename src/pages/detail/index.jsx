// 文章详情
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import mojs from "@mojs/core";
import {
  Skeleton,
  Button,
  Modal,
  Card,
  Avatar,
  Space,
  Tag,
  Drawer
} from "antd";
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
import Comments from "../../components/Comments";
import HotArticle from "./components/HotArticle";
import LeftSide from "./components/LeftSide";
import WaitArticle from "./components/WaitArticle";
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
  const [is_self, setIs_self] = useState(false); // 右侧粘性栏目是否显示
  const [show, setShow] = useState(false); // 右侧粘性栏目是否显示
  const [statesGroup, setStatesGroup] = useState({
    loveNum: 0,
    commentNum: 0,
    collectNum: 0,
    loveDone: false,
    collect: false,
    focus: false,
    wait: false
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

        // 对比作者和本地用户信息id是否一致，一致的话是本人的文章，则不显示关注
        if (author.data.id === userInfo.id) {
          setIs_self(true);
        }

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
        // 本地缓存查询当前文章是否已添加到 稍后在看队列
        const waitArr = JSON.parse(localStorage.getItem("waitArr")).queue;
        let is_wait = false;
        waitArr.forEach((item) => {
          if (item === Number(id)) is_wait = true;
        });
        setStatesGroup({
          loveNum: article.like_count,
          commentNum: article.comment_count,
          collectNum: article.collect_count,
          loveDone: is_like,
          collect: is_collect,
          focus: isFollow,
          wait: is_wait
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
      const burst = new mojs.Burst({
        // 爆裂范围 {从多大 : 到多大}
        radius: { 0: 50 },
        // 动画挂载的父元素, 如果不填默认挂载到 <body>
        parent: document.getElementById("likeSpecial"),
        // 动画延迟的贝塞尔曲线函数
        easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
        // 动画延迟时间
        duration: 1500,
        // 在动画动之前等待的时间 (这里一般设置150ms方便减少低端机型可能会存在的卡顿)
        delay: 300,
        // 扩散的粒子配置
        children: {
          duration: 750,
          // 粒子大小变换 {从多大 : 到多大}
          // rand(from, to) rand函数可以帮我们随机出一个区间的值
          radius: { 0: "rand(5, 25)" },
          // 形状选择, 这里我们选择了 “圆形”
          shape: "circle",
          // 粒子可选的填充色
          fill: [
            "#1abc9c",
            "#2ecc71",
            "#00cec9",
            "#3498db",
            "#9b59b6",
            "#fdcb6e",
            "#f1c40f",
            "#e67e22",
            "#e74c3c",
            "#e84393"
          ]
        },
        // 透明度
        opacity: 0.6,
        // 生成的粒子数量
        count: 10,
        onStart() {
          // 动画触发前的钩子函数
        },
        onComplete() {
          // 动画完成后的钩子函数
        }
      }).play();
      const aperture = new mojs.Transit({
        // 动画挂载的父元素, 如果不填默认挂载到 <body>
        parent: document.getElementById("likeSpecial"),
        // 动画延迟时间
        duration: 750,
        // 图形的类型, 这里选择圆形
        type: "circle",
        // 半径 {从多大 : 到多大}
        radius: { 0: 20 },
        // 填充透明色
        fill: "transparent",
        // 边框颜色
        stroke: "#E05B5B",
        // 边框粗细 {从多粗 : 到多粗}
        strokeWidth: { 20: 0 },
        // 透明度
        opacity: 0.6,
        // 动画延迟的贝塞尔曲线函数
        easing: mojs.easing.bezier(0, 1, 0.5, 1)
      });
      new mojs.Timeline().add(burst, aperture).play();
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

  // 添加/移除 稍后在看
  const handleWait = () => {
    // 更新稍后在看 状态
    let deleteIndex = 0;
    let waitArr = JSON.parse(localStorage.getItem("waitArr")) ?? { queue: [] };

    if (statesGroup.wait) {
      // 本地缓存移除该篇文章id
      waitArr.queue.forEach((item, index) => {
        if (item === Number(id)) {
          deleteIndex = index;
        }
      });
      waitArr.queue.splice(deleteIndex, 1);
    } else {
      waitArr.queue.push(Number(id));
    }

    localStorage.setItem("waitArr", JSON.stringify(waitArr));

    setStatesGroup({
      ...statesGroup,
      wait: !statesGroup.wait
    });
  };

  // 稍后在看抽屉
  const [visible, setVisible] = useState(false);
  const [xuanran, setXuanran] = useState(false); // 控制抽屉重复渲染的变量
  const openDrawer = () => {
    setVisible(true);
    setXuanran(!xuanran);
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
              handleWait={handleWait}
              openDrawer={openDrawer}
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
                  style={
                    userInfo.font_size <= 20 && userInfo.font_size >= 14
                      ? { fontSize: userInfo.font_size }
                      : { fontSize: "14px" }
                  }
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
                    className={is_self ? "unMounted" : ""}
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
                  ? "right-sidebar-sticky show animate__animated animate__fadeInRight"
                  : "right-sidebar-sticky unShow animate__animated animate__fadeOutRight"
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
                    className={`author-love ${is_self ? "unMounted" : ""}`}
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
        <Drawer
          title="稍后再看"
          placement="right"
          onClose={() => setVisible(false)}
          visible={visible}
        >
          <WaitArticle
            closeDrawer={() => setVisible(false)}
            xuanran={xuanran}
          />
        </Drawer>
      </div>
    </DetailWrapper>
  );
};

export default Detail;
