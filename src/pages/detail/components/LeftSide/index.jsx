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
  return (
    <LeftSection>
      <div className="container">
        <div className="button">
          <div className="eachButton" onClick={() => handleLove()}>
            <LikeFilled className="icon" />
            <div className="count">
              {articleInfo.like_count ? articleInfo.like_count : 121}
            </div>
          </div>
          <div className="eachButton" onClick={() => handleComment()}>
            <MessageFilled className="icon" />
            <div className="count">
              {articleInfo.comment_count ? articleInfo.like_count : 41}
            </div>
          </div>
          <div className="eachButton" onClick={() => handleCollect()}>
            <StarFilled className="icon" />
            <div className="count">
              {articleInfo.collect_count ? articleInfo.like_count : 232}
            </div>
          </div>
        </div>

        <div className="fontsize">
          <div className="slide">字体大小</div>
          <Slider onChange={handleSize} min={12} max={20} value={size} />
        </div>
      </div>
    </LeftSection>
  );
};

export default LeftSide;
