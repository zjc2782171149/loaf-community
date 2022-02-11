import styled from "styled-components";
import { colorBlue } from "../../../../reducer/constant";

export const ArticleSection = styled.aside`
  padding: 0 20px;
  width: 100%;
  .article-main {
    display: flex;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .article-image {
    margin-right: 15px;
    img {
      width: 100px;
      height: 85px;
    }
  }
  .article-main-list {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .article-title {
    font-size: 16px;
    line-height: 20px;
    color: #222;
    :hover {
      color: ${colorBlue};
    }
  }
  .article-content {
    font-size: 13px;
    color: rgba(0, 0, 0, 0.4);
  }
  .article-read {
    font-size: 14px;
  }
  .article-time {
    font-size: 14px;
  }
`;
