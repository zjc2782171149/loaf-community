import React from "react";
import { ProfileStyle } from "./profile";
import EssayShowDetail from "../components/essayShowDetail/index.jsx";

const Profile = () => {
  return (
    <ProfileStyle>
      {/* 我收藏的文章 */}
      <EssayShowDetail name="我的收藏" />
    </ProfileStyle>
  );
};

export default Profile;
