import styled from "styled-components";
import { colorWhite, colorBlue } from "../../../reducer/constant";

//const width = document.body.clientWidth;
//

export const SectionStyle = styled.div`
  .container {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  .section {
    width: 600px;
    //height: 300px;
    margin-top: 20px;
    background-color: ${colorWhite};
  }
  .text {
    height: 40px;
    line-height: 20px;
    border-bottom: 1px solid #f1f1f1;
    padding: 10px 20px;
    font-size: 10% !important;
    font-weight: 600;
    cursor: pointer;
    color: ${colorBlue};
  }
  .ant-list-item{
    border-bottom: 1px solid #f1f1f1 !important;
  }
  .ant-list-item-meta-title {
    font-weight: 700;
    margin: 0;
    cursor: pointer;
  }
  .ant-list-item-meta-title:hover {
    color: ${colorBlue};
  }
  .ant-dropdown-menu-item>>>.ant-dropdown-menu-title-content {
    font-size: 10% !important;
    //width: 40px;
    //text-align: center;
    color
  }
  .ant-dropdown-menu-title-content {
    color:${colorBlue}
  }
`;
