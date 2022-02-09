import styled from "styled-components";
// import { colorGrey, colorWhite } from "../../../../reducer/constant";

export const ProfileStyle = styled.div`
  .profile {
    width: 100%;
  }
  .title {
    font-size: 20px;
    font-weight: 600;
  }
  .body {
    position: relative;
    display: flex;
  }
  .form {
    width: 400px;
  }
  .right {
    position: absolute;
    width: 200px;
    margin: 0 0 0 550px;
  }
  .avatar-uploader {
    transform: scale(1.5);
    margin: 40px 0 0 50px;
  }
  .ps {
    margin-top: 15px;
  }
  .ps2 {
    margin-top: 15px;
    font-weight: 600;
  }
`;
