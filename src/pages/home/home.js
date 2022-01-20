import styled from "styled-components";
import { colorGrey } from "../../reducer/constant";

const width = document.body.clientWidth;
const height = document.body.clientHeight;
console.log(width, height);

export const HomeStyle = styled.div`
  .home {
    width: ${width};
    min-width: 1200px;
    min-height: 800px;
    background-color: ${colorGrey};
  }
`;
