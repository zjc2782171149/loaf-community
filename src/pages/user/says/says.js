import styled from "styled-components";
import { colorGrey } from "../../../reducer/constant";

export const SaysStyle = styled.div`
  .cardCursor {
    margin-right: 10px;
  }
  .cardCursor:hover {
    cursor: pointer;
    background-color: ${colorGrey};
  }
  .concernUser {
    margin-left: 400px;
  }
`;
