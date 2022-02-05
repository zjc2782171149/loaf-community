import styled from "styled-components";
import { colorGrey, colorWhite } from "../../../../reducer/constant";

const width = document.body.clientWidth;
const height = document.body.clientHeight;
console.log(width, height);

export const SettingStyle = styled.div`
  .setting {
    width: ${width};
    min-width: 800px;
    min-height: 900px;
    background-color: ${colorGrey};
    padding: 20px ${width / 10}px;
  }
  .main {
    width: 100%;
  }
  .header {
    width: 100%;
    height: 60px;
    background-color: ${colorWhite};
  }
  .site-page-header {
    height: 50px;
    transform: scale(0.8);
    margin-left: -120px;
  }
  .body {
    display: flex;
    width: 100%;
    height: 600px;
    margin: 20px 0 0 0;
  }
  .left {
    flex: 0.2;
    margin-right: 20px;
    background-color: ${colorWhite};
    padding: 10px;
  }
  .right {
    flex: 0.8;
    background-color: ${colorWhite};
  }
`;
