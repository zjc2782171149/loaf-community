import styled from "styled-components";
import { colorGrey, colorWhite } from "../../reducer/constant";

const width = document.body.clientWidth;

export const DetailWrapper = styled.div`
  transition: all 0.5s;
  .essay {
    background-color: ${colorGrey};
    padding: 20px ${width / 10}px;
  }
  .body {
    position: relative;
    margin: auto;
    display: flex;
    transition: all 0.5s;
    font-size: 16px;
  }
  .main {
    flex: 0.7;
    min-width: 830px;
    transition: all 0.5s;
    background-color: ${colorWhite};
    padding: 20px;
  }
  .article-meta {
    display: flex;
    align-items: baseline;
    line-height: 16px;
    font-size: 12px;
    color: #707070;
    margin: 20px 0;
  }
  .article-container {
    width: 100%;
    overflow: hidden;
    h1 {
      font-size: 30px;
      line-height: 1.5;
      font-weight: bold;
    }
    p {
      line-height: 1.8;
      margin: 15px 0;
    }
    section > img {
      width: 80% !important;
    }
  }
  .comment-container {
    position: relative;
    margin: 50px 0;
    padding: 50px 0;
  }
  .comment-content {
    display: block;
  }
  .title {
    font-size: 20px;
    font-weight: 600;
    line-height: 28px;
    color: #222;
  }
  .comment-action {
    padding-left: 8px;
    cursor: "auto";
  }
  .right-sidebar {
    flex: 0.3;
    min-width: 350px;
    max-height: 200px;
    margin-left: 20px;
    background-color: ${colorWhite};
  }
  .author {
    width: 100%;
  }
  .authorInfo {
    margin-left: 5px;
    font-size: 14px;
  }
  .author-message {
    color: rgba(0, 0, 0, 0.6);
    font-size: 13px;
  }
  .hotTitle {
    margin: 15px 37%;
  }
  .hotArticle {
    background-color: ${colorWhite};
  }
  .unMounted {
    display: none;
  }
  .right-sidebar-sticky {
    position: fixed;
    opacity: 0;
    transition: all 0.2s;
    z-index: -1;
    top: 40px;
    right: 150px;
    margin-left: 20px;
    width: 350px;
    min-width: 350px;
    background-color: ${colorWhite};
  }
  .show {
    opacity: 1 !important;
    z-index: 1 !important;
  }
  .unShow {
    opacity: -1 !important;
    z-index: -1 !important;
  }
`;
