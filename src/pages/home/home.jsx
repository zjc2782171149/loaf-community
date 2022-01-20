import React from "react";
// import { useState } from 'react';
import { HomeStyle } from "./home";
import Section from "../../components/home/section/section.jsx";

const Home = () => {
  return (
    <HomeStyle>
      <div className="home">
        <Section></Section>
      </div>
    </HomeStyle>
  );
};

export default Home;
