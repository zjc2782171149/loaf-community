import React from "react";
import { TopicStyle } from "./topic";
import TopicSection from "../../components/topic/topic.jsx";

const Topic = () => {
  return (
    <TopicStyle>
      <div className="topic">
        <TopicSection></TopicSection>
      </div>
    </TopicStyle>
  );
};

export default Topic;
