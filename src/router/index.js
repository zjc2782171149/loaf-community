import React, { Suspense, lazy } from "react";
import { Skeleton } from "antd";

// 配置懒加载
const Home = lazy(() => import("../pages/home/home.jsx"));
const Fish = lazy(() => import("../pages/fish/fish.jsx"));
const LeetCode = lazy(() => import("../pages/leetCode/leetCode.jsx"));
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

// onEnter: function (nextState, replace) {
//   // 如果本地存储中没token，那么跳转到登录注册页
//   console.log(nextState);
//   replace("/");
//   if (!localStorage.getItem("token")) {
//     // 如果要跳转到的页面是登录注册页，那就跳转(目的：防止死循环)
//     if (nextState.location.pathname !== "/login") {
//       console.log("没 token 还想跳转？快给我回登录页面");
//       replace("/login");
//     } else {
//       console.log("跳转到登录页面");
//     }
//   }
//   如果要跳转的是不存在的路由，那怎么拦截？
//   if(nextState)
// }，

// 路由配置
const routes = [
  {
    path: "/",
    element: lazyLoad(<Home />)
    // children: [
    //   {
    //     path: "home",
    //     element: lazyLoad(<Home />)
    //   }
    // ]
  },
  {
    path: "/leetCode",
    element: lazyLoad(<LeetCode />)
    // children: [
    //   {
    //     path: "fish",
    //     element: lazyLoad(<Fish />)
    //   }
    // ]
  },
  {
    path: "/fish",
    element: lazyLoad(<Fish />)
    // children: [
    //   {
    //     path: "fish",
    //     element: lazyLoad(<Fish />)
    //   }
    // ]
  },
  {
    path: "/topic/:id",
    element: lazyLoad(<Topic />)
  },
  // {
  //   path: "/essay",
  //   element: lazyLoad(<Essay />)
  //   // children: [
  //   //   {
  //   //     path: "fish",
  //   //     element: lazyLoad(<Fish />)
  //   //   }
  //   // ]
  // },
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
