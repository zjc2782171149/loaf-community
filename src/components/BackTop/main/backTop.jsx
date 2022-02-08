import React, { useState, useEffect } from "react";
import { BackTopStyle } from "./backTop.js";

const BackTop = () => {
  const [watchTime, setTime] = useState(0);
  const [imgSrc, setSrc] = useState("cat2");
  const [timer, setTimer] = useState(null);
  const [countClick, setCount] = useState(false);

  const updater = (watchTime) => watchTime + 1;

  const imgSrcs = {
    cat1: require("../../../assets/cat1.png"),
    cat2: require("../../../assets/cat2.png"),
    cat3: require("../../../assets/cat3.png"),
    cat4: require("../../../assets/cat4.png"),
    cat5: require("../../../assets/cat5.png")
  };

  if (watchTime === -1) {
    timer && clearInterval(timer);
    timer && setTimer(null);
  }

  useEffect(() => {
    function timer() {
      setTime(updater);
    }
    setInterval(timer, 60000);
  }, []);

  function toTop() {
    const offSet = window.pageYOffset;
    countClick ? setSrc("cat3") : setSrc("cat5");
    if (offSet !== 0) {
      setTimeout(() => {
        window.scrollTo({
          left: 0,
          top: 0,
          behavior: "smooth"
        });
      }, 100);
    }
    setCount(!countClick);
  }

  const showContext = () => {
    if (watchTime < 6 && !countClick) {
      return "点我返回顶部~";
    } else {
      return "看了" + watchTime + "mins啦";
    }
  };

  return (
    <BackTopStyle>
      <div className="container" onClick={toTop}>
        <a>
          <img className="cat" src={imgSrcs[imgSrc]} />
        </a>
        <div className="context">{showContext()}</div>
      </div>
    </BackTopStyle>
  );
};

export default BackTop;
