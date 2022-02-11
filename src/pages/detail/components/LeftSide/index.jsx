import React from "react";
import { LeftSection } from "./style";
import { Tooltip } from "antd";
import {
  LikeFilled,
  MessageFilled,
  StarFilled,
  TagsFilled,
  CodepenCircleFilled
} from "@ant-design/icons";

const LeftSide = ({
  articleInfo,
  size,
  handleCollect,
  handleComment,
  handleLove,
  handleWait,
  openDrawer
}) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <LeftSection>
      <div className="container">
        <div className="button">
          <div className="eachButton" onClick={() => handleLove()}>
            <LikeFilled
              id="likeSpecial"
              className="icon"
              style={
                articleInfo.loveDone ? { color: userInfo.theme_color } : {}
              }
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
              style={articleInfo.collect ? { color: userInfo.theme_color } : {}}
            />
            <div className="count">{articleInfo.collectNum ?? 0}</div>
          </div>
          <div className="eachButton2">
            <Tooltip
              className="hover"
              title="稍后在看"
              placement="left"
              color={userInfo.theme_color}
            >
              <TagsFilled
                className="icon"
                style={articleInfo.wait ? { color: userInfo.theme_color } : {}}
                onClick={() => handleWait()}
              />
            </Tooltip>
            <Tooltip title="打开稍后在看列表" color={userInfo.theme_color}>
              <CodepenCircleFilled
                className="waitArr"
                style={{ color: userInfo.theme_color }}
                onClick={() => openDrawer()}
              />
            </Tooltip>
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
