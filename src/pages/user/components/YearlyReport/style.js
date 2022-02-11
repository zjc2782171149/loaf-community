import styled from "styled-components";
// import { colorGrey, colorWhite, colorBlue } from "../../../reducer/constant";

export const YearlyReportStyle = styled.div`
  .yearly {
    display: flex;
    align-items: center;
    flex-direction: column;
    min-height: 1000px;
  }
  .title {
    margin: 30px 0;
    font-size: 30px;
    font-weight: 600;
  }
  .header {
    position: relative;
    padding: 0 20px;
    height: 200px;
    .introduction {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      text-align: center;
      width: 700px;
      padding: 10px 40px;
      font-weight: 600;
    }
    .imageRight {
      margin-left: 600px;
    }
  }
  .main {
    position: relative;
    margin-top: 150px;
    .one {
      margin-top: 60px;
      .one-title {
        font-size: 20px;
        font-weight: 600;
      }
      .one-section {
        font-weight: 600;
        margin: 0 0 20px 0;
      }
      .empty {
      }
    }
  }
  .echart {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
