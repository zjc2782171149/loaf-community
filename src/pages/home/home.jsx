import React from "react";
// import { useState } from 'react';
import { HomeMain } from "./home";
import Header from "../../publicComponents/header/header.jsx";
import Section from "../../components/home/section/section.jsx";

// const onChangeCardSk = (checked) => {
//   this.setState({ loading: !checked });
// };

const Home = () => {
  return (
    <HomeMain>
      <div className="home">
        <Header></Header>
        <Section></Section>
      </div>
    </HomeMain>
  );
};

export default Home;
