import React from "react";
import { LeftSection } from "./style";
import { Slider } from "antd";
import { LikeFilled, MessageFilled, StarFilled } from "@ant-design/icons";

const LeftSide = ({
  articleInfo,
  size,
  handleCollect,
  handleComment,
  handleLove,
  handleSize
}) => {
  console.log(articleInfo, size);
  return (
    <LeftSection>
      <div className="container">
        <div className="button">
          <div className="eachButton" onClick={() => handleLove()}>
            <LikeFilled
              className="icon"
              style={articleInfo.loveDone ? { color: "#1890FF" } : {}}
            />
            <div className="count">{articleInfo.likeNum ?? 121}</div>
          </div>
          <div className="eachButton" onClick={() => handleComment()}>
            <MessageFilled className="icon" />
            <div className="count">{articleInfo.commentNum ?? 41}</div>
          </div>
          <div className="eachButton" onClick={() => handleCollect()}>
            <StarFilled
              className="icon"
              style={articleInfo.collect ? { color: "#1890FF" } : {}}
            />
            <div className="count">{articleInfo.collectNum ?? 232}</div>
          </div>
        </div>

        <div className="fontsize">
          <div className="slide">字体大小:{size}</div>
          <Slider onChange={handleSize} min={12} max={20} value={size} />
        </div>
      </div>
    </LeftSection>
  );
};

export default LeftSide;
