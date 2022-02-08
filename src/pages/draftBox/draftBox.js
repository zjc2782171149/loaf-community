import styled from "styled-components";
import { colorGrey } from "../../reducer/constant";

const width = document.body.clientWidth;

export const DraftBoxStyle = styled.div`
  .container {
    width: ${width};
    min-height: 800px;
    background-color: ${colorGrey};
  }
`;
