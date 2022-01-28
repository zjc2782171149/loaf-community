import React, { useState } from "react";
import  AllSubscribe  from "./allSubscribe/allSubscribe.jsx";
import  Subscribed  from "./subscribed/subscribed.jsx";
import { SubscribeStyle } from "./subscribe";
import { Tabs } from "antd";

const { TabPane } = Tabs;
const Subscribe = () => {
  const [curSubskey, setCurSubskey] = useState("1");

  const data = [
    {
      id: 1,
      title: '前端',
      followed: false,
      tag: 'hot',
    },
    {
      id: 2,
      title: '后端',
      followed: false,
      tag: 'hot',
    },
    {
      id: 3,
      title: 'JavaScript',
      followed: false,
      tag: 'hot',
    },
    {
      id: 4,
      title: 'Github',
      followed: false,
      tag: 'hot',
    },
    {
      id: 5,
      title: 'Vue.js',
      followed: false,
      tag: 'hot',
    },
    {
      id: 6,
      title: '算法',
      followed: false,
      tag: 'hot',
    },
    {
      id: 7,
      title: 'CSS',
      followed: false,
      tag: 'hot',
    },
    {
      id: 8,
      title: '数据库',
      followed: false,
      tag: 'hot',
    },
    {
      id: 9,
      title: 'C语言',
      followed: false,
      tag: 'new',
    },
    {
      id: 10,
      title: 'Modern.js',
      followed: false,
      tag: 'new',
    },
    {
      id: 11,
      title: '轻服务',
      followed: false,
      tag: 'new',
    },
    {
      id: 12,
      title: 'Vite',
      followed: false,
      tag: 'new',
    },
  ];
  function changeTabs(activeKey){
    setCurSubskey(activeKey)
    //console.log(curSubskey)
  }

  function changePage(key, data){
    if(key == '1'){
      return <Subscribed data={data} changeNum={setData}/>
    }else if(key == '2'){
      return <AllSubscribe data={data}/>
    }
  }
  const [curData, setData] = useState(data);
  return (
    <SubscribeStyle>
      <div className="subscribe">
      <Tabs className="subscribeTabs" onChange={changeTabs} activeKey={curSubskey}>
            <TabPane  tab="已关注标签" key="1">
            </TabPane>
            <TabPane  tab="全部标签" key="2">
            </TabPane>
          </Tabs>
      </div>
      <div className="subscribeContainer">
      { changePage(curSubskey, curData) }
      </div>
    </SubscribeStyle>
  );
};

export default Subscribe;