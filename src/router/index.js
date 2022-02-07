import React, { Suspense, lazy } from "react";
import { Skeleton } from "antd";

// 配置懒加载
const Home = lazy(() =>
  import(/* webpackChunkName: "home" */ "../pages/home/home.jsx")
);
const Fish = lazy(() =>
  import(/* webpackChunkName: "fish" */ "../pages/fish/fish.jsx")
);
const LeetCode = lazy(() =>
  import(/* webpackChunkName: "leetCode" */ "../pages/leetCode/leetCode.jsx")
);
const Detail = lazy(() =>
  import(/* webpackChunkName: "detail" */ "../pages/detail/index.jsx")
);
const EditContent = lazy(() =>
  import(/* webpackChunkName: "editContent" */ "../pages/editContent/index.jsx")
);
const Topic = lazy(() =>
  import(/* webpackChunkName: "topic" */ "../pages/topic/topic.jsx")
);
const PersonalHome = lazy(() =>
  import(/* webpackChunkName: "user/index" */ "../pages/user/index/user.jsx")
);
const Profile = lazy(() =>
  import(
    /* webpackChunkName: "user/profile" */ "../pages/user/profile/profile.jsx"
  )
);
const Posts = lazy(() =>
  import(/* webpackChunkName: "user/posts" */ "../pages/user/posts/posts.jsx")
);
const Says = lazy(() =>
  import(/* webpackChunkName: "user/says" */ "../pages/user/says/says.jsx")
);
const Likes = lazy(() =>
  import(/* webpackChunkName: "user/likes" */ "../pages/user/likes/likes.jsx")
);
const Follow = lazy(() =>
  import(
    /* webpackChunkName: "user/follow" */ "../pages/user/follow/follow.jsx"
  )
);
const PersonalSetting = lazy(() =>
  import(
    /* webpackChunkName: "user/setting/index" */ "../pages/user/setting/index/index.jsx"
  )
);
const SettingProfile = lazy(() =>
  import(
    /* webpackChunkName: "user/setting/profile" */ "../pages/user/setting/profile/profile.jsx"
  )
);
const Account = lazy(() =>
  import(
    /* webpackChunkName: "user/setting/account" */ "../pages/user/setting/account/account.jsx"
  )
);
const Resume = lazy(() =>
  import(
    /* webpackChunkName: "user/setting/resume" */ "../pages/user/setting/resume/resume.jsx"
  )
);
const Subscribe = lazy(() =>
  import(/* webpackChunkName: "subscribe" */ "../pages/subscribe/subscribe.jsx")
);
const DraftBox = lazy(() =>
  import(/* webpackChunkName: "draftBox" */ "../pages/draftBox/draftBox.jsx")
);
const Login = lazy(() =>
  import(/* webpackChunkName: "login" */ "../pages/login/login.jsx")
);

// 懒加载需要加上Suspense的异步回调
const lazyLoad = (children) => {
  return <Suspense fallback={<Skeleton active />}>{children}</Suspense>;
};

// 路由配置
const routes = [
  {
    path: "/",
    element: lazyLoad(<Home />)
  },
  {
    path: "/leetCode",
    element: lazyLoad(<LeetCode />)
  },
  {
    path: "/fish",
    element: lazyLoad(<Fish />)
  },
  {
    path: "/editContent", // 从页头的写文章、发文 跳转过来，不带文章id
    element: lazyLoad(<EditContent />)
  },
  {
    path: "/editContent/:id", // 从草稿箱跳转过来，带文章id
    element: lazyLoad(<EditContent />)
  },
  {
    path: "/detail/:id",
    element: lazyLoad(<Detail />)
  },
  {
    path: "/topic/:id",
    element: lazyLoad(<Topic />)
  },
  {
    path: "/user/:id",
    element: lazyLoad(<PersonalHome />),
    children: [
      {
        path: "profile",
        element: lazyLoad(<Profile />)
      },
      {
        path: "posts",
        element: lazyLoad(<Posts />)
      },
      {
        path: "says",
        element: lazyLoad(<Says />)
      },
      {
        path: "likes",
        element: lazyLoad(<Likes />)
      },
      {
        path: "follow",
        element: lazyLoad(<Follow />)
      }
    ]
  },
  {
    path: "/user/setting",
    element: lazyLoad(<PersonalSetting />),
    children: [
      {
        path: "profile",
        element: lazyLoad(<SettingProfile />)
      },
      {
        path: "account",
        element: lazyLoad(<Account />)
      },
      {
        path: "resume",
        element: lazyLoad(<Resume />)
      }
    ]
  },
  {
    path: "/subscribe",
    element: lazyLoad(<Subscribe />)
  },
  {
    path: "/draftBox",
    element: lazyLoad(<DraftBox />)
  },
  {
    path: "/login",
    element: lazyLoad(<Login />)
  },
  // 404找不到
  { path: "*", element: lazyLoad(<Home />) }
];

// 导出
export default routes;
