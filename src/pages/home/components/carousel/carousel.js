import styled from "styled-components";

const width = document.body.clientWidth;
const height = document.body.clientHeight;
console.log(width, height);

export const SectionCarouselStyle = styled.div`
  .carousel {
    width: ${(width - 320) * 0.75}px;
    margin-bottom: 20px;
  }
  .carouse-image {
    width: 100%;
    height: 225px;
  }
`;
