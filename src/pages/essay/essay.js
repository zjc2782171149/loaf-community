import styled from "styled-components";
import { colorGrey } from "../../reducer/constant";

const width = document.body.clientWidth;
const height = document.body.clientHeight;
console.log(width, height);

export const EssayStyle = styled.div`
  .essay {
    width: ${width};
    min-width: 1200px;
    min-height: 1000px;
    background-color: ${colorGrey};
  }
`