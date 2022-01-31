import React, { useEffect, useState } from "react";
import { SectionStyle } from "./section";
import {  Dropdown, List, Menu, Space, Modal } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';


const Section = () => {
    const [draftList, setDraftList] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newData, setData] = useState([]);
    useEffect(() => {
        const getData = [
            {
                id: 1,
                title: "文章 | 微前端，实现真正的缝合怪",
                publish_time: "1642875404720",
                introduction: "「2022 年什么会火？什么该学？本文正在参与“聊聊 2022 技术趋势”征文活动 」你们见过C项目的页面嵌入到A项目吗？你们见过A项目有个模块外包给别人做的项目，最后考虑如何引入的吗，登录咋办？",
                publish_user_id: 2
            },
            {
                id: 2,
                title: "文章",
                publish_time: "1643531945000",
                introduction: "2022 年什么会火",
                publish_user_id: 2
            }
        ];

        setTimeout(() => {
            setDraftList(getData);
          }, 0);
    },[])

    const formatDate = (value) => {
        const date = new Date(parseInt(value));
        let year = date.getFullYear(),
            month = date.getMonth() + 1,
            day = date.getDate(),
            hour = date.getHours(),
            minutes = date.getMinutes();
        if (month < 10) { month = '0' + month; }
        if (day < 10) { day = '0' + day; }
        if (hour < 10) { hour = '0' + hour; }
        if (minutes < 10) { minutes = '0' + minutes; }
        const t = year + '年' + month + '月' + day + '日 ' + hour + ':' + minutes;
        return t;
    }

    // const menu = (
    //     <Menu style={{ width:"50px"}} onClick={handleMenuClick}>
    //       <Menu.Item key="edit" style={{fontSize:"10%"}}>编辑</Menu.Item>
    //       <Menu.Item key="delete" style={{fontSize:"10%"}}>删除</Menu.Item>
    //     </Menu>
    //   );

    function handleMenuClick (item) {
        let data = [...draftList];
        console.log(item.key);
        if(item.key.startsWith("delete")){
            const index = item.key[6]
            console.log(index)
            data = data.splice(index,1)
            console.log(data)
            setData(data)
        }
    }

    return(
        <SectionStyle>
            <div className="container">
                <div className="section">
                    <p className="text">文章草稿（{draftList.length}）</p>
                        <List
                        className="listContext"
                        itemLayout="vertical"
                        size="large"
                        dataSource={draftList}
                        renderItem={(item) => (
                            <List.Item
                            key={item.id}
                            actions={[
                                <Space key={item.id}>
                                    <span style={{ marginRight:"10px" }}>{formatDate(item.publish_time)}</span>
                                    {/* <Dropdown overlay={menu} trigger={['click']} placement="bottomCenter" onClick={handleMenuClick}><EllipsisOutlined className="dots"/></Dropdown> */}
                                    <Dropdown overlay={()=>{
                                        return(
                                            <Menu style={{ width:"50px"}} onClick={handleMenuClick}>
                                                <Menu.Item key={"edit"+(item.id)} style={{fontSize:"10%"}}>编辑</Menu.Item>
                                                <Menu.Item key={"delete"+(item.id)} style={{fontSize:"10%"}} onClick={()=>(setIsModalVisible(true))}>删除</Menu.Item>
                                            </Menu>
                                        )
                                    }} trigger={['click']} placement="bottomCenter"><EllipsisOutlined className="dots"/></Dropdown>
                                </Space>
                              ]}
                            >
                            <List.Item.Meta className="title"
                                title={item.title}
                            />
                            </List.Item>
                        )}
                        />
                        <Modal title="删除草稿" cancelText="取消" visible={isModalVisible} onOk={() => {setDraftList(newData);setIsModalVisible(false)}} onCancel={() => {setIsModalVisible(false); setData([])}}>
                            <p>删除后不可恢复，确认删除此草稿吗？</p>
                        </Modal>
                </div>
            </div>
        </SectionStyle>
    )
}

export default Section;
