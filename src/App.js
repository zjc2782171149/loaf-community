import React from "react";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import routes from "../src/router/index";
//import { BackTop } from "antd";
import Header from "./layout/header/header.jsx";
import BackToTop from "./components/BackTop/backToTop.jsx"

//回到顶部
// const style = {
//   height: 40,
//   width: 40,
//   lineHeight: "40px",
//   borderRadius: 4,
//   backgroundColor: "#1088e9",
//   color: "#fff",
//   textAlign: "center",
//   fontSize: 14
// };

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
        {/* <BackTop visibilityHeight={0}>
          <div style={style}>UP</div>
        </BackTop> */}
        <BackToTop />
      </Router>
    </>
  );
};
export default Wrapper;
