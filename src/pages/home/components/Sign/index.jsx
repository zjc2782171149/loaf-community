import React, { useState, useEffect } from "react";
import { Button, Avatar, Image, message, Card } from "antd";
import { ThunderboltFilled, CheckCircleFilled } from "@ant-design/icons";
import { get_user_sign, set_user_sign } from "../../../../service/home";
import { SignStyle } from "./style";

const { Meta } = Card;

const Sign = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [signLoading, setSignLoading] = useState(false);
  const [dailySign, setDailySign] = useState(false);

  useEffect(() => {
    // 查询签到
    const initF = async () => {
      try {
        const res = await get_user_sign();
        setDailySign(res.data.today);
      } catch (err) {
        console.log(err);
      }
    };
    initF();
  }, []);

  // 每日签到
  async function DailySign() {
    setSignLoading(true);
    try {
      const res = await set_user_sign();
      setTimeout(() => {
        setSignLoading(false);
        setDailySign(true);
        message.success(`恭喜您，${res.msg}!`);
      }, 1000);
    } catch (err) {
      message.error("签到失败");
      setSignLoading(false);
    }
  }

  return (
    <SignStyle>
      <Card
        className="right-aside-card"
        hoverable="true"
        actions={[
          (!dailySign && (
            <Button
              loading={signLoading}
              type="primary"
              shape="round"
              icon={<ThunderboltFilled />}
              size="large"
              key="dailyNo"
              onClick={() => DailySign()}
            >
              签到
            </Button>
          )) ||
            (dailySign && (
              <Button
                type="default"
                shape="round"
                icon={<CheckCircleFilled />}
                size="large"
                key="dailyYes"
                disabled
              >
                已签到
              </Button>
            ))
        ]}
      >
        <Meta
          avatar={
            <Avatar
              src={
                <Image
                  src={
                    userInfo.avatar_url ??
                    require("../../../../assets/LoginOut.png")
                  }
                  style={{ width: 32, height: 32 }}
                  preview={false}
                />
              }
            />
          }
          title="下午好！"
          description="点亮你在社区的每一天"
        />
      </Card>
    </SignStyle>
  );
};

export default Sign;
