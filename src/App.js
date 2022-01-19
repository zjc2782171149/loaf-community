import React from "react";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import routes from "../src/router/index";

const App = () => {
  return useRoutes(routes);
};

const Wrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};
export default Wrapper;
