import styled from "styled-components";
// import { colorGrey, colorWhite, colorBlue } from "../../../reducer/constant";

const width = document.body.clientWidth;
const height = document.body.clientHeight;
console.log(width, height);

export const FollowStyle = styled.div`
  padding: 0 20px;
  margin: 10px 0;
  .followAll {
  }
  .focus {
    font-size: 20px;
    font-weight: 600;
  }
  .focusTabs {
    position: absolute;
    top: -15px;
    right: 0;
  }
`;
