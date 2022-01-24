import styled from "styled-components";
import { colorWhite, colorGrey, colorBlue } from "../../../reducer/constant";

const width = document.body.clientWidth;
console.log(width);

export const PostsStyle = styled.div`
  .section {
    display: flex;
    width: 100%;
    min-height: 400px;
    padding: 20px ${width / 6}px;
  }
  .left-aside {
    flex: 0.75;
  }
  .right-aside {
    flex: 0.25;
    margin-left: 20px;
  }
  .image {
    display: inline-block;
  }
  .username {
    margin-top: 20px;
    font-weight: 600;
    font-size: 25px;
  }
  .editPersonal {
    position: absolute;
    margin: -15px 0 0 140px;
    border: 1px solid ${colorBlue};
    color: ${colorBlue};
  }
  .icon {
    margin-left: 320px;
    font-size: 20px;
  }
  .position {
  }
  .main {
    width: 100%;
    min-height: 200px;
    background-color: ${colorWhite};
  }
  .main-header {
    padding: 0 20px;
  }
  .content-list {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-right: 10px;
  }
  .content-list:hover {
    cursor: pointer;
    background-color: ${colorGrey};
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
  .right-aside-card {
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
    margin-top: -15px;
    width: 100px;
  }
  .send {
    width: 100%;
    margin-top: 20px;
    padding: 10px 0 0 10px;
    background-color: ${colorWhite};
  }
  .tabPane {
    transform: scale(1.5);
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
  .hoverBlue:hover {
    cursor: pointer;
    color: ${colorBlue};
  }
  .essayAvatar {
    transform: scale(1.6);
    margin: 20px 0 0 -5px;
  }
  .essayHeader {
    font-size: 14px;
  }
  .essayTitle:hover {
    color: ${colorBlue};
  }
  .essayDescription {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;
