import styled from "styled-components";

const width = document.body.clientWidth;
const height = document.body.clientHeight;
console.log(width, height);

export const BackTopStyle = styled.div`
  .container {
    width: 100px;
    position: fixed;
    right: 35px;
    bottom: 70px;
    display: flex;
    justify-content: center;
    align-item: center;
    cursor: pointer;
  }
  .cat {
    height: 70px;
    display: inline-block;
    position: inherit;
  }
  .context {
    width: 100px;
    height: 30px;
    line-height: 24px;
    font-size: 5px;
    border: 3px solid pink;
    border-radius: 30%;
    position: inherit;
    bottom 50px;
    text-align: center;
    font-weight: 580;
  }
`;