import React from "react";
import { ResumeStyle } from "./resume";
import { Card, Button, Space, Empty } from "antd";
const Resume = () => {
  return (
    <ResumeStyle>
      <Card
        className="resume"
        title={<span className="title">简历管理</span>}
        extra={
          <Space size="middle">
            <span className="ps">仅支持pdf格式，文件大小需小于10M</span>
            <Button type="primary">上传简历</Button>
          </Space>
        }
      >
        <div className="body">
          <Empty description={"暂无简历"} className="empty" />
        </div>
      </Card>
    </ResumeStyle>
  );
};

export default Resume;
