import styled from "styled-components";

const width = document.body.clientWidth;
const height = document.body.clientHeight;
console.log(width, height);

export const SubscribeStyle = styled.div`
  .subscribe {
    box-sizing: border-box;
    width: ${width};
    height: 46px;
    line-height: 46px;
    border-bottom: 1px solid #f1f1f1;
    display: flex;
    justify-content: center;
  }
  .subscribeTabs {
    width: ${(width - 320) * 0.735}px;
  }
  .subscribeContainer {
    width: ${(width - 320) * 0.735}px;
    margin: auto;
    margin-top: 20px;
  }
`;
