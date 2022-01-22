import React from "react";
import { FishStyle } from "./fish";
import LeetCodeSection from "../../components/fish/section/section.jsx";

const Fish = () => {
  return (
    <FishStyle>
      <div className="fish">
        <LeetCodeSection />
      </div>
    </FishStyle>
  );
};

export default Fish;
