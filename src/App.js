import React from "react";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import routes from "../src/router/index";
import Header from "./publicComponents/header/header.jsx";

const App = () => {
  return useRoutes(routes);
};

const Wrapper = () => {
  return (
    <>
      <Router>
        <Header />
        <App />
      </Router>
    </>
  );
};
export default Wrapper;
