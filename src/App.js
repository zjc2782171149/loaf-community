import React from "react";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import routes from "../src/router/index";
//import { BackTop } from "antd";
import Header from "./layout/header/header.jsx";
import BackToTop from "./components/BackTop/backToTop.jsx";

// 配置路由
const App = () => {
  return useRoutes(routes);
};

const Wrapper = () => {
  return (
    <>
      <Router>
        <Header />
        <App />
        <BackToTop />
      </Router>
    </>
  );
};
export default Wrapper;
