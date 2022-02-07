import React from "react";
import EssayShowDetail from "../../layout/essayShowDetail/index.jsx";
import SectionCarousel from "./components/carousel/carousel.jsx";
import Self from "./components/Self/index.jsx";
import Sign from "./components/Sign/index.jsx";
import Announce from "./components/Announce/index.jsx";

import { HomeStyle, LeftSideStyle, RightSideStyle } from "./home";

const Home = () => {
  return (
    <HomeStyle>
      <div className="home">
        <LeftSideStyle>
          <div className="left-aside">
            <SectionCarousel />
            <div className="main">
              <EssayShowDetail />
            </div>
          </div>
        </LeftSideStyle>

        <RightSideStyle>
          <div className="right-aside">
            {/* 个人信息展示 */}
            <Self />
            {/* 签到 */}
            <Sign />
            {/* 公告栏 */}
            <Announce />
          </div>
        </RightSideStyle>
      </div>
    </HomeStyle>
  );
};

export default Home;
