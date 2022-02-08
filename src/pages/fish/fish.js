import styled from "styled-components";
import { colorGrey, colorWhite, colorBlue } from "../../reducer/constant";

const width = document.body.clientWidth;
const height = document.body.clientHeight;
console.log(width, height);

export const FishStyle = styled.div`
  .fish {
    display: flex;
    width: ${width};
    min-width: 1200px;
    min-height: 1000px;
    background-color: ${colorGrey};
    justify-content: space-between;
    padding: 20px ${width / 20}px;
  }
`;

export const LeftSideStyle = styled.div`
  .left-aside {
    flex: 0.13;
    min-width: 120px;
  }
  .left-title {
    font-weight: 600;
    font-size: 20px;
  }
  .iconNum {
    transform: scale(1.3);
    cursor: pointer;
  }
`;

export const MiddleStyle = styled.div`
.middle-aside {
  flex: 0.7;
  min-width: 800px;
  margin: 0 20px;
}
.main {
  min-height: 200px;
  background-color: ${colorWhite};
  padding: 20px 20px;
}
.sendMessage {
  width: 100%
  height:300px;
}
.smileHover:hover {
  color: ${colorBlue};
  cursor: pointer;
}
.button {
  float: right;
  width: 100px;
}
.tabs {
  width: 100%;
  min-height:300px;
}
.tabsTopic {
  padding: 10px 0 0 0;
}
.messageList {
  background-color: ${colorWhite};
  margin-top: -5px;
  padding-right: 10px;
  padding-bottom: 10px;
}
.topicHover {
  cursor: pointer;
  padding: 0 0 0 10px;
  :hover {
    background-color: ${colorGrey};
  }
}
.avatarContent {
  transform:scale(1.2);
  margin-top:10px;
}
.topic-time {
  color: rgba(0,0,0,0.6);
  font-size: 13px;
}
`;

export const RightSideStyle = styled.div`
  .right-aside {
    flex: 0.25;
    min-width: 260px;
  }
  .right-aside-card {
    width: 100%;
    margin-bottom: 20px;
  }
  .right-aside-card-hot {
    width: 100%;
  }
`;
