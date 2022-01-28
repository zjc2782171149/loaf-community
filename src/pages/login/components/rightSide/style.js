import styled from "styled-components";

export const RightSideStyle = styled.div`
  .logo {
    position: absolute;
    top: 0px;
    right: 0px;
    transform: scale(0.8);
    border-radius: 14px;
  }
  .ps {
    font-size: 24px;
    font-weight: 600;
    margin: 60px 0 30px 0;
  }
  .rightSide {
    text-align: center;
  }
  .login-form {
    width: 300px;
    min-width: 200px;
  }
  .login-form-forgot {
    float: right;
  }
  .ant-col-rtl {
    float: left;
  }
  .login-form-forgot {
    float: left;
  }
  .login-form-button {
    width: 100%;
    margin-bottom: 10px;
  }
  .footer {
    font-size: 40px;
    margin-top: 40px;
  }
`;
