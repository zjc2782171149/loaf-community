import React from "react";
import EssaySection from "../../components/essay/section/section.jsx";
import { EssayStyle } from "./essay";
 
const Essay = () => {
  return (
    <EssayStyle>
      <div className="essay">
        <EssaySection />
      </div>
    </EssayStyle>
  );
};

export default Essay;