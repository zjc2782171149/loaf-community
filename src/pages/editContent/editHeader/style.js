import styled from "styled-components";
import { colorBlue } from "../../../reducer/constant";

const width = document.body.clientWidth;
const height = document.body.clientHeight;
console.log(width, height);

export const HeaderStyle = styled.div`
  .header {
    display: flex;
    width: 100%;
    height: 64px;
    line-height: 60px;
    background: #fff;
    margin: 5px 0 0 0;
    border-top: 1px solid rgba(0, 0, 0, 0.2);
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }
  .left {
    flex: 0.7;
    .input {
      padding: 0 30px;
      font-size: 20px;
    }
  }

  .right {
    flex: 0.3;
    .button {
      margin-left: 100px;
    }
    .draftButton {
      margin: 0 10px;
      color: ${colorBlue};
      border: 1px solid ${colorBlue};
    }
    .draftButton:hover {
      color: #3498db;
    }
    .avatar {
      margin: 0 0 0 30px;
    }
  }
`;
