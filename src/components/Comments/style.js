import styled from "styled-components";

export const CommentReply = styled.div`
  .comment-action {
    padding-left: 8px;
    cursor: "auto";
  }
  [class*="-col-rtl"] .comment-action {
    padding-right: 8px;
    padding-left: 0;
  }
  .content {
    font-size: 16pz;
    font-weight: 400;
    line-height: 24px;
    color: #222;
  }
  .reply {
    width: 600px;
  }
  .dianzan {
    width: 30px;
  }
`;

export const CommentStyle = styled.div`
  .commentTitle {
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: 600;
  }
`;
