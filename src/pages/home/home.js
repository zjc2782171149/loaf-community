import styled from "styled-components";
import { colorGrey, colorWhite } from "../../reducer/constant";

const width = document.body.clientWidth;
const height = document.body.clientHeight;
console.log(width, height);

export const HomeStyle = styled.div`
  .home {
    display: flex;
    width: 100%;
    min-height: 950px;
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
    min-height: 450px;
    padding: 0 20px;
    background-color: ${colorWhite};
  }
`;

export const RightSideStyle = styled.div`
  .right-aside {
    flex: 0.25;
    margin-left: 20px;
    min-width: 300px;
  }
`;
