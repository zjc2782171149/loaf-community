import React from "react";
import { PostsStyle } from "./posts";
import EssayShowDetail from "../components/essayShowDetail/index.jsx";

const Posts = () => {
  return (
    <PostsStyle>
      {/* 我发表的文章 */}
      <EssayShowDetail name="我的文章" />
    </PostsStyle>
  );
};

export default Posts;
