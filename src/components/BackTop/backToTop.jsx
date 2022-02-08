import React, { Suspense, useEffect, useState } from "react";
//懒加载
const BackTop = React.lazy(() => import("./main/backTop.jsx"));

const BackToTop = () => {
  const [isLogin, setLogin] = useState(false);
  useEffect(() => {
    function getUserInfo() {
      if (localStorage.getItem("userInfo")) {
        setLogin(true);
      } else {
        setLogin(false);
      }
    }
    getUserInfo();
  }, [localStorage]);

  useEffect(() => {
    function timer() {
      if (location.href && location.href.split("/")[3] !== "login") {
        setLogin(true);
      }
    }
    setInterval(timer, 1000);
  }, []);

  return (
    <div>
      <Suspense fallback={<div></div>}>
        {isLogin ? <BackTop /> : <div></div>}
      </Suspense>
    </div>
  );
};

export default BackToTop;
