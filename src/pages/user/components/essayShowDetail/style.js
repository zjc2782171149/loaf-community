import styled from "styled-components";
import { colorWhite, colorBlue, colorGrey } from "../../../../reducer/constant";

const width = document.body.clientWidth;

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
  }
  .main-header {
    padding: 0 20px;
  }
  .content-list-accnounce {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-right: 10px;
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
  .right-aside {
    flex: 0.25;
    margin-left: 20px;
  }
  .right-aside-card {
    width: 100%;
    margin-bottom: 20px;
  }
  .iconNum {
    transform: scale(1.3);
  }
  .hoverBlue:hover {
    cursor: pointer;
    color: ${colorBlue};
  }
  .essayAvatar {
    transform: scale(1.3);
    margin: 20px 5px 0 -5px;
  }
  .essayHeader {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.4);
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
