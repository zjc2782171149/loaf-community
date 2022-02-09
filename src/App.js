import React from "react";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import routes from "../src/router/index";
import Header from "./layout/header/header.jsx";
import BackToTop from "./components/BackTop/backToTop.jsx";
import { TransitionGroup, CSSTransition } from "react-transition-group";

// 配置路由
const App = () => {
  return useRoutes(routes);
};

const Wrapper = () => {
  return (
    <>
      <Router>
        <Header />
        <TransitionGroup>
          <CSSTransition
            key={location.pathname}
            classNames="alert"
            timeout={300}
          >
            <App />
          </CSSTransition>
        </TransitionGroup>
        <BackToTop />
      </Router>
    </>
  );
};
export default Wrapper;
