import React, { Suspense, lazy } from "react";
import { Skeleton } from "antd";

// 配置懒加载
const Home = lazy(() => import("../pages/home/home.jsx"));
const Fish = lazy(() => import("../pages/fish/fish.jsx"));
const LeetCode = lazy(() => import("../pages/leetCode/leetCode.jsx"));
const Subscribe = lazy(() => import("../pages/subscribe/subscribe.jsx"));
const Topic = lazy(() => import("../pages/topic/topic.jsx"));
const PersonalHome = lazy(() => import("../pages/user/index/user.jsx"));
const Profile = lazy(() => import("../pages/user/profile/profile.jsx"));
const Posts = lazy(() => import("../pages/user/posts/posts.jsx"));
const Says = lazy(() => import("../pages/user/says/says.jsx"));
const Likes = lazy(() => import("../pages/user/likes/likes.jsx"));
const PersonalSetting = lazy(() =>
  import("../pages/user/setting/index/index.jsx")
);
const SettingProfile = lazy(() =>
  import("../pages/user/setting/profile/profile.jsx")
);
const Account = lazy(() => import("../pages/user/setting/account/account.jsx"));
const Resume = lazy(() => import("../pages/user/setting/resume/resume.jsx"));
// const Essay = lazy(() => import("../pages/essay/essay.jsx"));

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
    path: "/subscribe",
    element: lazyLoad(<Subscribe />)
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
  // 404找不到
  { path: "*", element: lazyLoad(<Home />) }
];

// 导出
export default routes;
