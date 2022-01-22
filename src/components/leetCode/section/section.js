import styled from "styled-components";
import { colorWhite } from "../../../reducer/constant";

const width = document.body.clientWidth;
console.log(width);

export const SectionStyle = styled.div`
  .section {
    display: flex;
    width: 100%;
    min-height: 400px;
    padding: 20px ${width / 10}px;
  }
  .left-aside {
    flex: 0.75;
  }
  .main {
    width: 100%;
    min-height: 200px;
    background-color: ${colorWhite};
    padding: 20px 0;
  }
  .leetCodeIntroduce {
    width: 100%;
    margin-bottom: 20px;
  }
  .main-body {
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
  .right-aside {
    flex: 0.25;
    margin-left: 20px;
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
  }
  .iconfontBig {
    transform: scale(2);
    cursor: pointer;
  }
  .hotStyle {
    transform: scale(1.5);
    margin: 0 5px;
  }
`;