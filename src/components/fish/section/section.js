import styled from "styled-components";
import { colorWhite, colorGrey, colorBlue } from "../../../reducer/constant";

const width = document.body.clientWidth;
console.log(width);
export const SectionStyle = styled.div`
  .section {
    display: flex;
    justify-content: space-between;
    width: 100%;
    min-height: 400px;
    padding: 20px ${width / 20}px;
  }
  .left-aside {
    flex: 0.13;
  }
  .middle-aside {
    flex: 0.7;
    margin: 0 20px;
  }
  .right-aside {
    flex: 0.25;
  }
  .left-title {
    font-weight:600;
    font-size: 20px;
  }
  .main {
    min-height: 200px;
    background-color: ${colorWhite};
    padding: 20px 0;
  }
  .main-body {
    padding: 0 20px;
  }
  .smileHover:hover {
    color: ${colorBlue};
    cursor: pointer;
  }
  .gutter-row:hover {
    cursor: pointer;
  }
  .sendMessage {
    width: 100%
    height:300px;
  }
  .textarea {
    background-color: ${colorGrey};
    margin-bottom:20px;
  }
  .button {
    float: right;
    width: 100px;
  }
  .messageList {
    background-color: ${colorWhite};
    margin-top: -5px;
    padding-right: 10px;
    padding-bottom: 10px;
  }
  .tabs {
    width: 100%;
    min-height:300px;
  }
  .content-list {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .hotList {
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
  .right-aside-card {
    width: 100%;
    margin-bottom: 20px;
  }
  .right-aside-card-hot {
    width: 100%;
  }
  .iconNum {
    transform: scale(1.3);
    cursor: pointer;
  }
  .iconfontBig {
    transform: scale(2);
    cursor: pointer;
  }
  .hotStyle {
    transform: scale(1.5);
    margin: 0 5px;
  }
  .left-aside-item {
    margin-top: 20px;
  }
  .publish-time {
    color: rgba(0,0,0,0.3);
    font-size:14px;
  }
  .focusTabs {
    position: absolute;
    top: -15px;
    right: 0;
  }
  .avatarContent {
    transform:scale(1.2);
    margin-top:10px;
  }
  .tabsTopic {
    padding: 10px 0px 0 0;
  }
  .topic-time {
    color: rgba(0,0,0,0.6);
    font-size: 13px;
  }
  .topicHover {
    cursor: pointer;
    padding: 0 0 0 10px;
  }
  .topicHover:hover {
    background-color: ${colorGrey};
  }
  .hotContent {
    width: 100%;
    overflow:hidden;
    white-space:nowrap;
    text-overflow:ellipsis;
  }
`;
