import styled, { keyframes } from "styled-components";
import { colorBlue } from "../../../../reducer/constant";

const change = keyframes`
    0% { 
            transform: scale(1);
    }
    10% {
            transform: scale(1.1);
    }
    20% {
            transform: scale(1.2);
    }
    30% {
            transform: scale(1.3);
    }
    40% {
            transform: scale(1.4);
    }
    50% {
            transform: scale(1.5);
    }
    100% {
            transform: scale(1);
    }
`;

export const LeftSection = styled.div`
  width: 20px;
  .container {
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    top: 140px;
    z-index: 1000;
    transform: translateX(-70px);
    height: 340px;
  }
  .button {
    display: flex;
    flex-direction: column;
    width: 65px;
    height: 300px;
    color: #999999;
    transition: all 0.5s;
  }
  .eachButton {
    flex: 1;
    width: 55px;
    background-color: #fff;
    box-shadow: 0.4rem 0.4rem 0.8rem #c8d0e7;
    border-radius: 50%;
    cursor: pointer;
    margin: 20px 0;
    text-align: center;
    line-height: 30px;
  }
  .eachButton:hover {
    color: ${colorBlue} !important;
  }
  .icon {
    margin-top: 22px;
    transform: scale(1.2);
  }
  .icon:hover {
    animation: ${change} 1s linear infinite;
  }
  .count {
    width: 33px;
    height: 17px;
    line-height: 17px;
    border-radius: 33%;
    background-color: #c2c8d1;
    color: #fff;
    font-size: 12px;
    margin: -45px 0 0 40px;
  }
  .fontsize {
    width: 50px;
    font-size: 14px;
    height: 30px;
    line-height: 30px;
    margin: -10px 0 0 -8px;
  }
  .slide {
    width: 120px;
  }
`;
