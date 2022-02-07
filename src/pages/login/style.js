import styled from "styled-components";

export const LoginStyle = styled.div`
  .login {
    postition: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
  }
  .container {
    position: relative;
    width: 80%;
    height: 80%;
    background-color: #f9f9ff;
    border-radius: 14px;
    opacity: 0.8;
  }
  .logo {
    width: 150px;
    height: 100px;
    margin: 10px 0 0 30px;
  }
  .main {
    display: flex;
    width: 100%;
    height: 80vh;
    .left {
      flex: 55%;
      display: flex;
      justify-content: center;
      align-items: center;
      .mainImage {
        width: 90%;
        height: 70%;
        z-index: 1000;
      }
    }
    .right {
      flex: 40%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;
