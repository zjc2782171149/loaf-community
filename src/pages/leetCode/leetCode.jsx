import React from "react";
import LeetCodeSection from "../../components/leetCode/section/section.jsx";
import { LeetCodeStyle } from "./leetCode";

const LeetCode = () => {
  return (
    <LeetCodeStyle>
      <div className="leetcode">
        <LeetCodeSection />
      </div>
    </LeetCodeStyle>
  );
};

export default LeetCode;
