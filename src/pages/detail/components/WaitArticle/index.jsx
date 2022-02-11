import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ArticleSection } from "./style";
import { Space, Divider } from "antd";
import { LikeOutlined } from "@ant-design/icons";
import { formatDate } from "../../../../utils/date";
import { get_essay_detail } from "../../../../service/detail";

const WaitArticle = ({ closeDrawer, xuanran }) => {
  const navigate = useNavigate();
  const [waitList, setWaitList] = useState([]);

  useEffect(() => {
    const init = [];
    let waitArr = JSON.parse(localStorage.getItem("waitArr")) ?? { queue: [] };
    async function initWait() {
      const len = waitArr.queue.length;
      for (let i = 0; i < len; i++) {
        const res = await get_essay_detail({ id: waitArr.queue[i] });
        console.log(res);
        init.push(res.data);
      }
      setWaitList([...init]);
    }
    initWait();
  }, [xuanran]);

  return (
    <ArticleSection>
      {waitList?.map((article) => (
        <div key={article?.id} className="article-main">
          <div className="article-main-list">
            <Space direction="vertical" size="middle">
              <a
                className="article-title"
                onClick={() => {
                  closeDrawer();
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

export default WaitArticle;
