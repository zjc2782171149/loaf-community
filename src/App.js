import React from "react";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import routes from "../src/router/index";
import Header from "./layout/header/header.jsx";
import { BackTop } from "antd";

// 回到顶部
const style = {
  height: 40,
  width: 40,
  lineHeight: "40px",
  borderRadius: 4,
  backgroundColor: "#1088e9",
  color: "#fff",
  textAlign: "center",
  fontSize: 14
};

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
        <BackTop>
          <div style={style}>UP</div>
        </BackTop>
      </Router>
    </>
  );
};
export default Wrapper;
