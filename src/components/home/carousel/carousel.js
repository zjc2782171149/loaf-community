import styled from "styled-components";

const width = document.body.clientWidth;
const height = document.body.clientHeight;
console.log(width, height);

export const SectionCarouselStyle = styled.div`
  .carousel {
    width: ${(width - 320) * 0.735}px;
    margin-bottom: 20px;
  }
  .carouse-image {
    width: ${(width - 320) * 0.735}px;
    height: 225px;
  }
`;
