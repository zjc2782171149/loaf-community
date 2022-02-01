import React, { useEffect, useState } from "react";
import { SectionStyle } from "./section";
import { Dropdown, List, Menu, Space, Modal } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { get_drftbox_essay } from "../../../service/user";
import { formatDate } from "../../../utils/date";

const Section = () => {
  const [draftList, setDraftList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newData, setData] = useState([]);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  // 初始化草稿箱列表
  useEffect(() => {
    async function initDraftbox() {
      try {
        const res = await get_drftbox_essay({ id: userInfo.id });
        setDraftList(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    initDraftbox();
  }, []);

  function handleMenuClick(item) {
    let data = [...draftList];
    console.log(item.key);
    if (item.key.startsWith("delete")) {
      const index = item.key[6];
      console.log(index);
      data = data.splice(index, 1);
      console.log(data);
      setData(data);
    }
  }

  return (
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
                    <span style={{ marginRight: "10px" }}>
                      {formatDate(item.publish_time)}
                    </span>
                    {/* <Dropdown overlay={menu} trigger={['click']} placement="bottomCenter" onClick={handleMenuClick}><EllipsisOutlined className="dots"/></Dropdown> */}
                    <Dropdown
                      overlay={() => {
                        return (
                          <Menu
                            style={{ width: "50px" }}
                            onClick={() => handleMenuClick()}
                          >
                            <Menu.Item
                              key={"edit" + item.id}
                              style={{ fontSize: "10%" }}
                            >
                              编辑
                            </Menu.Item>
                            <Menu.Item
                              key={"delete" + item.id}
                              style={{ fontSize: "10%" }}
                              onClick={() => setIsModalVisible(true)}
                            >
                              删除
                            </Menu.Item>
                          </Menu>
                        );
                      }}
                      trigger={["click"]}
                      placement="bottomCenter"
                    >
                      <EllipsisOutlined className="dots" />
                    </Dropdown>
                  </Space>
                ]}
              >
                <List.Item.Meta className="title" title={item.title} />
              </List.Item>
            )}
          />
          <Modal
            title="删除草稿"
            cancelText="取消"
            visible={isModalVisible}
            onOk={() => {
              setDraftList(newData);
              setIsModalVisible(false);
            }}
            onCancel={() => {
              setIsModalVisible(false);
              setData([]);
            }}
          >
            <p>删除后不可恢复，确认删除此草稿吗？</p>
          </Modal>
        </div>
      </div>
    </SectionStyle>
  );
};

export default Section;
