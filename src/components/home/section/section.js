import styled from "styled-components";
import { colorWhite } from "../../../reducer/constant";

const width = document.body.clientWidth;
const height = document.body.clientHeight;
console.log(width, height);

export const SectionStyle = styled.div`
  .section {
    display: flex;
    width: 100%;
    min-height: 400px;
    padding: 20px 160px;
  }
  .left-aside {
    flex: 0.75;
  }
  .carousel {
    width: ${(width - 320) * 0.735}px;
    margin-bottom: 20px;
  }
  .carouse-image {
    width: ${(width - 320) * 0.735}px;
    height: 225px;
  }
  .main {
    width: ${(width - 320) * 0.735}px;
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
  .right-aside {
    flex: 0.25;
    margin-left: 20px;
  }
  .right-aside-card {
    width: ${(width - 320) * 0.246}px;
    margin-bottom: 20px;
  }
  .iconNum {
    transform: scale(1.3);
  }
`;
