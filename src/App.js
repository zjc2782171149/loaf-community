import React from "react";
import { BrowserRouter as Router, Link, useRoutes } from "react-router-dom";
import routes from "../src/router/index";
import Home from "./pages/home/home.jsx";

const App = () => {
  let element = useRoutes(routes);
  return element;
};

const Wrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};
export default Wrapper;
