import styled from "styled-components";
import { colorGrey, colorWhite } from "../../reducer/constant";

const width = document.body.clientWidth;

export const LeetCodeStyle = styled.div`
  .leetcode {
    display: flex;
    width: ${width};
    min-width: 1200px;
    min-height: 800px;
    padding: 20px ${width / 10}px;
    background-color: ${colorGrey};
  }
`;

export const LeftSideStyle = styled.div`
  .left-aside {
    flex: 0.75;
    min-width: 900px;
  }
  .main {
    width: 100%;
    min-height: 200px;
    background-color: ${colorWhite};
    padding: 20px 20px;
  }
  .leetCodeIntroduce {
    width: 100%;
    margin-bottom: 20px;
  }
  .iconfontBig {
    transform: scale(2);
    cursor: pointer;
  }
`;

export const RightSideStyle = styled.div`
  .right-aside {
    flex: 0.25;
    margin-left: 20px;
    min-width: 250px;
  }
  .right-aside-card {
    margin-bottom: 20px;
  }
  .iconNum {
    transform: scale(1.3);
  }
  .hotStyle {
    transform: scale(1.5);
    margin: 0 5px;
  }
`;
