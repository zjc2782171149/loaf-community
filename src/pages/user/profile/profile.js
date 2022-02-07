import styled from "styled-components";
import { colorGrey } from "../../../reducer/constant";

export const ProfileStyle = styled.div`
  .likes {
    margin-right: 10px;
  }
  .likes:hover {
    cursor: pointer;
    background-color: ${colorGrey};
  }
  .concernUser {
    margin-left: 400px;
  }
`;
