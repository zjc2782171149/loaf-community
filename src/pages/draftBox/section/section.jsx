import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SectionStyle } from "./section";
import { Dropdown, List, Menu, Space, Modal, message } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import {
  get_drftbox_essay,
  delete_draftbox_essay
} from "../../../service/user";

const Section = () => {
  const navigate = useNavigate();
  const [draftList, setDraftList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deleteID, setDeleteID] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);
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

  // 删除文章
  async function deleteEssay() {
    try {
      console.log(draftList.splice(deleteIndex, 1));
      setDraftList([...draftList]);
      await delete_draftbox_essay({ id: deleteID });
      message.success("草稿删除成功");
    } catch (err) {
      console.log(err);
      message.success("网络异常，请稍后再试");
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
            renderItem={(item, index) => (
              <List.Item
                key={item.id}
                actions={[
                  <Space key={item.id}>
                    <span style={{ marginRight: "10px" }}>
                      {item.introduction}
                    </span>
                    {/* <Dropdown overlay={menu} trigger={['click']} placement="bottomCenter" onClick={handleMenuClick}><EllipsisOutlined className="dots"/></Dropdown> */}
                    <Dropdown
                      overlay={() => {
                        return (
                          <Menu style={{ width: "50px" }}>
                            <Menu.Item
                              key={"edit" + item.id}
                              style={{ fontSize: "10%" }}
                              onClick={() => {
                                navigate(`/editContent/${item.id}`);
                              }}
                            >
                              编辑
                            </Menu.Item>
                            <Menu.Item
                              key={"delete" + item.id}
                              style={{ fontSize: "10%" }}
                              onClick={() => {
                                setIsModalVisible(true);
                                setDeleteID(item.id);
                                setDeleteIndex(index);
                              }}
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
              deleteEssay();
              setIsModalVisible(false);
            }}
            onCancel={() => {
              setIsModalVisible(false);
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
