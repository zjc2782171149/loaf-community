import React from "react";
import RightSide from "./components/rightSide/index.jsx";
import { LoginStyle } from "./style";
import ParticlesBg from "particles-bg";

const Login = () => {
  return (
    <LoginStyle>
      <ParticlesBg
        type="radius"
        bg={{
          position: "absolute",
          left: 0,
          zIndex: -1,
          width: "100%",
          height: "100vh",
          margin: "0",
          opacity: 0.6
        }}
      />
      <div className="login">
        <div className="container">
          <div className="main">
            <div className="left">
              <img
                className="mainImage"
                src={require("../../assets/left.jpg")}
                alt=""
              />
            </div>
            <div className="right">
              <RightSide />
            </div>
          </div>
        </div>
      </div>
    </LoginStyle>
  );
};

export default Login;
