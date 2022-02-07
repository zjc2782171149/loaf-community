import React, { Suspense, useEffect, useState } from 'react';
//懒加载
const BackTop = React.lazy(() => import('./main/backTop.jsx'));

const BackToTop = () =>{
    const [isLogin, setLogin] = useState(false)
    useEffect(() => {
        function getUserInfo() {
            if (localStorage.getItem('userInfo')){
                setLogin(true)
                console.log("logining!")
            }else{
                setLogin(false)
                console.log("need login!")
            }
        }
        getUserInfo()
      }, []);

    return (
        <div>
          <Suspense fallback={<div></div>}>
              {isLogin ? <BackTop /> : <div></div>}
          </Suspense>
        </div>
      );
}

export default BackToTop;
