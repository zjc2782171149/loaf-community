import React from "react";
import { IndexStyle } from "./home";
import Header from "../../layout/header/header.jsx";
import Section from "../../components/home/section/section.jsx";
import LeetCode from "../leetCode/leetCode.jsx";
import Fish from "../fish/fish.jsx";
import { headerChange } from "../../reducer/headerChange";

// const onChangeCardSk = (checked) => {
//   this.setState({ loading: !checked });
// };

// 这个页面用来当作下面三个子组件的共同父组件，也就是用于兄弟组件之间传值

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
