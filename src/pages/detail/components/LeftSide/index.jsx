import React from "react";
import { LeftSection } from "./style";
import { LikeFilled, MessageFilled, StarFilled } from "@ant-design/icons";

const LeftSide = ({
  articleInfo,
  size,
  handleCollect,
  handleComment,
  handleLove
}) => {
  return (
    <LeftSection>
      <div className="container">
        <div className="button">
          <div className="eachButton" onClick={() => handleLove()}>
            <LikeFilled
              className="icon"
              style={articleInfo.loveDone ? { color: "#1890FF" } : {}}
            />
            <div className="count">{articleInfo.loveNum ?? 0}</div>
          </div>
          <div
            className="eachButton"
            onClick={() => handleComment(articleInfo.commentNum)}
          >
            <MessageFilled className="icon" />
            <div className="count">{articleInfo.commentNum ?? 0}</div>
          </div>
          <div className="eachButton" onClick={() => handleCollect()}>
            <StarFilled
              className="icon"
              style={articleInfo.collect ? { color: "#1890FF" } : {}}
            />
            <div className="count">{articleInfo.collectNum ?? 0}</div>
          </div>
        </div>

        <div className="fontsize">
          <div className="slide">字体大小:{size}px</div>
        </div>
      </div>
    </LeftSection>
  );
};

export default LeftSide;
