import React from "react";
import { Carousel } from "antd";
import { SectionCarouselStyle } from "./carousel";

const SectionCarousel = () => {
  return (
    <SectionCarouselStyle>
      <Carousel autoplay effect="fade" className="carousel">
        <div>
          <img
            className="carouse-image"
            src={require("../../../../assets/carousel1.webp")}
          />
        </div>
        <div>
          <img
            className="carouse-image"
            src={require("../../../../assets/zjtd.png")}
          />
        </div>
      </Carousel>
    </SectionCarouselStyle>
  );
};

export default SectionCarousel;
