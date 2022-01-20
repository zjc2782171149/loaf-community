import React from "react";
import { IndexStyle } from "./home";
import Header from "../../publicComponents/header/header.jsx";
import Section from "../../components/home/section/section.jsx";
import LeetCode from "../leetCode/leetCode.jsx";
import Fish from "../fish/fish.jsx";
import { headerChange } from "../../reducer/headerChange";

// const onChangeCardSk = (checked) => {
//   this.setState({ loading: !checked });
// };

const Index = () => {
  return (
    <IndexStyle>
      <div className="index">
        {/* <Header></Header> */}
        <Home />
        <LeetCode />
        <Fish />
      </div>
    </IndexStyle>
  );
};

export default Index;
