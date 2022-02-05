import React from "react";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import routes from "../src/router/index";
import { BackTop } from "antd";
import Header from "./layout/header/header.jsx";

// import { createGlobalStyle } from "styled-components";
// export const GlobalStyles = createGlobalStyle`
//   body {
//     background: ${({ theme }) => theme.body};
//     color: ${({ theme }) => theme.text};
//     transition: all 1.0s linear;
//   }
//   `;

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
      {/* <GlobalStyles> */}
      <Router>
        <Header />
        <App />
        <BackTop>
          <div style={style}>UP</div>
        </BackTop>
      </Router>
      {/* </GlobalStyles> */}
    </>
  );
};
export default Wrapper;
