import styled from "styled-components";

const width = document.body.clientWidth;
const height = document.body.clientHeight;
console.log(width, height);

export const SubscribesStyle = styled.div`
  .container {
    width: ${width};
  }
  Card {
    height: 200px;
  }
`;