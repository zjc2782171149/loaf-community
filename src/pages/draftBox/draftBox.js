import styled from "styled-components";
import { colorGrey } from "../../reducer/constant";

const width = document.body.clientWidth;
const height = document.body.clientHeight;
console.log(width, height);

export const DraftBoxStyle = styled.div`
  .container {
    width: ${width};
    min-height: 800px;
    background-color: ${colorGrey};
  }
`;


