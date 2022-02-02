import React from "react";
import { useNavigate } from "react-router";
import { ArticleSection } from "./style";
import { Space, Divider } from "antd";
import { LikeOutlined } from "@ant-design/icons";
import { formatDate } from "../../../../utils/date";

const HotArticle = ({ articleList }) => {
  const navigate = useNavigate();

  // 侧边栏文章详情跳转
  const getSideDetail = (id) => {
    navigate(`/detail/${id}`);
  };

  // const image = (data) => {
  //   //是否有封面及显示
  //   return data ? (
  //     <div className="article-image">
  //       <Image
  //         preview={false}
  //         src={data}
  //         onError={(event) => {
  //           event.target.parentNode.parentNode.style.display = "none";
  //         }}
  //       />
  //     </div>
  //   ) : null;
  // };

  return (
    <ArticleSection>
      {articleList?.map((article) => (
        <div key={article?.id} className="article-main">
          {/* {image(article?.image_url)} */}
          <div className="article-main-list">
            <Space direction="vertical" size="middle">
              <a
                className="article-title"
                onClick={() => getSideDetail(article.id)}
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
