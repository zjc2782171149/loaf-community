import React from "react";
import { List, notification, Card } from "antd";

const Announce = () => {
  const announcementList = [
    {
      title: "关于我们(bug生产队)",
      time: "2022-02-10",
      description:
        "可通过链接了解我们https://lhcgmmdf97.feishu.cn/docs/doccnYqYVMI4JMLmANnXKGCwdKe#"
    },
    {
      title: "【笔记创作活动】已开启，超值礼品等…",
      time: "2022-01-17",
      description:
        "认真记录、创作笔记内容的同学将有机会获得我们为大家准备超值大奖🎁 春节礼盒、小米蓝牙耳机、卫衣、保温杯......等你来拿"
    },
    {
      title: "【好题分享活动】开奖啦~",
      time: "2022-01-17",
      description: "请中奖的同学尽快联系相关社区工作人员"
    },
    {
      title: "摸鱼学社|意见&建议反馈收集",
      time: "2022-01-15",
      description:
        "如果你对社区有好的建议，欢迎留言，让我们一起把青训营社区建设得更好吧~"
    }
  ];

  const openAnnouncement = (title) => {
    console.log(title);
    announcementList.forEach((item) => {
      if (item.title === title) {
        notification.open({
          message: item.title,
          description: item.description,
          duration: 2
        });
      }
    });
  };

  return (
    <Card
      className="right-aside-card"
      title="公告栏"
      extra={<a href="">更多</a>}
      hoverable="true"
    >
      <List
        className="content-list-accnounce"
        loadMore={true}
        itemLayout="horizontal"
        dataSource={announcementList}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={
                <a
                  href=""
                  onClick={(e) => {
                    e.preventDefault();
                    openAnnouncement(item.title);
                  }}
                >
                  {item.title}
                </a>
              }
              description={item.time}
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default Announce;
