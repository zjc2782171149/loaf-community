import React, { Suspense, lazy } from "react";
import { Skeleton } from "antd";

// 配置懒加载
const Home = lazy(() => import("../pages/home/home.jsx"));

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
    element: lazyLoad(<Home />),
    children: [
      {
        path: "home",
        element: lazyLoad(<Home />)
      }
    ]
  },
  // 404找不到
  { path: "*", element: lazyLoad(<Home />) }
];

// 导出
export default routes;
