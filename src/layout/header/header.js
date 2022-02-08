import styled from "styled-components";
import { colorBlue, colorGrey } from "../../reducer/constant";

const width = document.body.clientWidth;

export const HeaderStyle = styled.div`
  .home {
    width: ${width};
    min-width: 1200px;
    min-height: 1000px;
    background-color: ${colorGrey};
  }
  .header {
    display: flex;
    width: 100%;
    height: 64px;
    line-height: 64px;
    background: #fff;
    border-bottom: 1px solid #f1f1f1;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);
    padding: 0px 160px;
  }
  .header-tabs {
    margin-left: 30px;
    line-height: 32px;
  }
  .left {
    display: flex;
  }
  .image {
    display: inline-block;
    margin: 5px 20px;
  }
  .textt {
    font-size: 20px;
    font-weight: 600;
  }
  .right {
    position: relative;
    flex: 1;
  }
  .search {
    position: absolute;
    width: 220px;
    right: 0;
    margin: 15px 215px 0 0;
    font-size: 14px;
    background-color: ${colorGrey};
  }
  .button {
    position: absolute;
    width: 100px;
    right: 0;
    margin: 15px 90px 0 0;
  }
  .bell {
    position: absolute;
    width: 100px;
    height: 20px;
    right: 0;
    margin: 23px 12px 0 0;
    transform: scale(1.2);
  }
  .bell:hover {
    cursor: pointer;
  }
  .badge {
    position: absolute;
    right: 0;
    transform: scale(0.7);
    margin: 10px 30px 0 0;
  }
  .avatar {
    position: absolute;
    right: 0;
    margin: 15px 0 0 0;
  }
  .modalTitle {
    color: ${colorBlue};
    font-size: 20px;
  }
  .modalFooter {
    font-weight: 600;
  }
`;
