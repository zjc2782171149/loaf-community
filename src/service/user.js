import instance, { uploadFile } from "../utils/request";
// import axios from "axios";

// 通过 id 来获取用户信息
export const get_user_info = (options) => {
  return instance({
    url: `/user/${options.id}/info`,
    method: "GET"
  });
};

// 修改用户信息
export const set_user_info = (options) => {
  return instance({
    url: "/user/info",
    method: "PUT",
    data: options
  });
};

// 修改用户设置
export const set_user_setting = (options) => {
  return instance({
    url: "/user/setting",
    method: "PUT",
    data: options
  });
};

// 修改密码
export const set_user_password = (options) => {
  return instance({
    url: "/user/password",
    method: "PUT",
    data: options
  });
};

// 上传用户头像
export const set_user_avatar = (options) => {
  return uploadFile({
    url: "/user/avatar/upload",
    method: "POST",
    data: options
  });
};

// 获取用户发表话题列表
export const get_user_topic = () => {
  return instance({
    url: "/topic/list",
    method: "GET"
  });
};

// 获取话题详情
export const get_topic_detail = (options) => {
  return instance({
    url: `/topic/list/${options.id}`,
    method: "GET"
  });
};

/**
 * 关注
 */

// 查看关注列表
export const get_user_follow = () => {
  return instance({
    url: "/user/follow/list",
    method: "GET"
  });
};

// 查看关注者列表
export const get_user_followed = () => {
  return instance({
    url: "/user/followed/list",
    method: "GET"
  });
};

// 查询某个用户关注列表
export const get_which_user_follow = (options) => {
  return instance({
    url: `/user/${options.id}/follow/list`,
    method: "GET"
  });
};

// 查询某个用户关注者列表
export const get_which_user_followed = (options) => {
  return instance({
    url: `/user/${options.id}/followed/list`,
    method: "GET"
  });
};

// 关注用户
export const set__user_follow = (options) => {
  return instance({
    url: `/user/follow/${options.id}`,
    method: "POST"
  });
};

// 取消关注
export const delete_user_follow = (options) => {
  return instance({
    url: `/user/follow/${options.id}`,
    method: "DELETE"
  });
};

/**
 * 个人资料下面的四个分类
 */

// 获取某个用户已发表文章列表
export const get_publish_essay = (options) => {
  return instance({
    url: `/user/${options.id}/essay/list`,
    method: "GET"
  });
};

// 获取用户点赞的文章列表
export const get_like_essay = () => {
  return instance({
    url: `/user/essay/like`,
    method: "GET"
  });
};

// 获取用户收藏的文章列表
export const get_collect_essay = () => {
  return instance({
    url: `/user/essay/collect`,
    method: "GET"
  });
};

// 获取用户发表的帖子列表
export const get_publish_topic = () => {
  return instance({
    url: `/user/topic`,
    method: "GET"
  });
};

/**
 * 我的草稿箱
 */

// 获取某个用户草稿箱列表
export const get_drftbox_essay = (options) => {
  return instance({
    url: `/user/${options.id}/save/list`,
    method: "GET"
  });
};

// 新增草稿箱文章
export const add_drftbox_essay = (options) => {
  return instance({
    url: `/essay/save`,
    method: "POST",
    data: options
  });
};

// 删除草稿箱文章
export const delete_draftbox_essay = (options) => {
  return instance({
    url: `/essay/save`,
    method: "POST",
    data: options
  });
};
