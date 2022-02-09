import React from "react";
import { useNavigate } from "react-router";
import { ArticleSection } from "./style";
import { Space, Divider } from "antd";
import { LikeOutlined } from "@ant-design/icons";
import { formatDate } from "../../../../utils/date";

const HotArticle = ({ articleList }) => {
  const navigate = useNavigate();

  return (
    <ArticleSection>
      {articleList?.map((article) => (
        <div key={article?.id} className="article-main">
          <div className="article-main-list">
            <Space direction="vertical" size="middle">
              <a
                className="article-title"
                onClick={() => {
                  navigate(`/detail/${article.id}`, { replace: true });
                }}
              >
                {article.title}
              </a>
              <span className="article-content">{article.introduction}</span>
              <Space size="large">
                <span className="article-read">
                  {article.like_count} <LikeOutlined />
                </span>
                <span className="article-time">
                  {formatDate(article.publish_time)}
                </span>
              </Space>
            </Space>
            <Divider />
          </div>
        </div>
      ))}
    </ArticleSection>
  );
};

export default HotArticle;
