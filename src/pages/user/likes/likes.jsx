import React from "react";
import { LikesStyle } from "./likes";
import EssayShowDetail from "../components/essayShowDetail/index.jsx";

const Likes = () => {
  return (
    <LikesStyle>
      {/* 我点赞的文章 */}
      <EssayShowDetail name="我的点赞" />
    </LikesStyle>
  );
};

export default Likes;
