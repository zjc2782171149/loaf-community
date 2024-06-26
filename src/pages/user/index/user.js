import styled from "styled-components";
import { colorGrey, colorWhite, colorBlue } from "../../../reducer/constant";

const width = document.body.clientWidth;

export const UserStyle = styled.div`
  .user {
    width: ${width};
    min-width: 1200px;
    min-height: 800px;
    background-color: ${colorGrey};
  }
  .section {
    display: flex;
    width: 100%;
    min-height: 400px;
    padding: 20px ${width / 6}px;
  }
  .left-aside {
    flex: 0.75;
    min-width: 850px;
  }
  .right-aside {
    flex: 0.25;
    min-width: 250px;
    margin-left: 20px;
  }
  .image {
    display: inline-block;
    transform: scale(0.8);
    border-radius: 50%;
  }
  .username {
    margin-top: 20px;
    font-weight: 600;
    font-size: 25px;
  }
  .editPersonal {
    position: absolute;
    bottom: 70px;
    right: 15px;
    border: 1px solid ${colorBlue};
    color: ${colorBlue};
  }
  .icon {
    margin-left: 440px;
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
  .yearly {
    width: 100%;
    margin-top: 20px;
    padding: 10px;
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
`;
