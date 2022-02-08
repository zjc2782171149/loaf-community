import styled from "styled-components";
import { colorGrey, colorWhite } from "../../reducer/constant";

const width = document.body.clientWidth;

export const TopicStyle = styled.div`
  .topic {
    display: flex;
    width: ${width};
    min-width: 1200px;
    min-height: 800px;
    background-color: ${colorGrey};
    padding: 20px ${width / 6}px;
  }

  .avatar {
    transform: scale(1.4);
    margin: 15px 0 0 0;
  }

  .main-tabs {
    font-weight: 600;
    line-height: 18px;
  }
  .tab-flex {
    font-weight: 500;
    font-size: 14px;
  }
  .main-tabs-items {
    margin-bottom: 5px;
    border: none;
  }
  .listSeeMore {
    transform: scale(1.3);
  }
  .listSeeMore:hover {
    cursor: pointer;
  }
  .leetCodeIntroduce {
    width: 100%;
    margin-bottom: 20px;
  }
  .iconNum {
    transform: scale(1.3);
  }
  .publish-time {
    color: rgba(0, 0, 0, 0.3);
    font-size: 14px;
  }
  .concernButton {
    float: right;
  }

  .textarea {
    width: 540px;
    background-color: ${colorGrey};
  }
  .sendComment {
    float: left;
    margin-top: 20px;
  }
  .commentArea {
    background-color: ${colorWhite};
    padding-top: 40px;
    padding-right: 20px;
  }
  .title {
    margin: 0 20px;
    font-weight: 600;
    font-size: 20px;
  }
  .comment-list {
    padding: 20px;
  }
  .comment-action {
    padding-left: 8px;
    cursor: "auto";
  }

  [class*="-col-rtl"] .comment-action {
    padding-right: 8px;
    padding-left: 0;
  }
`;

export const LeftSideStyle = styled.div`
  .left-aside {
    flex: 0.65;
    min-width: 600px;
  }
  .main {
    width: 100%;
    min-height: 200px;
    background-color: ${colorWhite};
  }
  .send {
    width: 100%;
    padding: 20px;
    background-color: ${colorWhite};
  }
`;

export const RightSideStyle = styled.div`
  .right-aside {
    flex: 0.35;
    margin-left: 20px;
    min-width: 300px;
  }
  .right-aside-card {
    width: 100%;
    margin-bottom: 20px;
  }
  .content-list {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;
