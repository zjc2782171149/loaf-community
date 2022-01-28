import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ArticleSection } from "./style";
import { Image, Space } from "antd";
const HotArticle = () => {
  const navigate = useNavigate();
  // 侧边栏文章详情跳转
  const getSideDetail = (id) => {
    navigate(`/detail/${id}`);
  };
  const image = (data) => {
    //是否有封面及显示
    return data ? (
      <div className="article-image">
        <Image
          preview={false}
          src={data}
          onError={(event) => {
            event.target.parentNode.parentNode.style.display = "none";
          }}
        />
      </div>
    ) : null;
  };

  const [articleList, setArticleList] = useState([]);
  useEffect(() => {
    const arr = [];
    for (let i = 0; i < 3; i++) {
      arr.push({
        id: i + 1,
        title: "测试标题",
        read_count: 1321,
        publish_time: "3个月前",
        image_url: require("../../../../assets/zjtd.png")
      });
    }
    setArticleList(arr);
  }, []);

  return (
    <ArticleSection>
      {articleList?.map((article) => (
        <div
          key={article?.id}
          className="article-main"
          onClick={() => getSideDetail(article?.id)}
        >
          {image(article?.image_url)}
          <div className="article-main-list">
            <Space direction="vertical" size="middle">
              <span className="article-title">{article?.title}</span>
              <span className="article-content">主要内容</span>
              <Space size="large">
                <span className="article-read">{article?.read_count} 阅读</span>
                <span className="article-time">{article?.publish_time}</span>
              </Space>
            </Space>
          </div>
        </div>
      ))}
    </ArticleSection>
  );
};

export default HotArticle;
