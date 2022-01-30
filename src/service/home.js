import instance from "../utils/request";

/****
 * 各分类及各分类文章 api
 */
// 获取文章分类列表
export const get_essay_all = () => {
  return instance({
    url: `/essay/list`,
    method: "GET"
  });
};

// 获取某个板块下的文章列表
export const get_tabs_essay = (options) => {
  return instance({
    url: `/essay/list/${options.id}`,
    method: "GET"
  });
};

// 根据id获取文章详情
export const get_essay_detail = (options) => {
  return instance({
    url: `/essay/${options.id}`,
    method: "GET"
  });
};

// 根据id获取文章点赞、收藏状态
export const get_essay_status = (options) => {
  return instance({
    url: `/essay/${options.id}/info`,
    method: "GET"
  });
};

/****
 * 本人信息 api
 */
// 获取用户点赞的评论列表，本人
export const get_like_comment = () => {
  return instance({
    url: `/user/comment/like`,
    method: "GET"
  });
};

// 通过 id 来获取用户信息
export const get_user_info = (options) => {
  return instance({
    url: `/user/${options.id}/info`,
    method: "GET"
  });
};

// 获取用户点赞的文章列表，本人
export const get_like_essay = () => {
  return instance({
    url: `/user/essay/like`,
    method: "GET"
  });
};

// 获取用户收藏的文章列表，本人
export const get_collect_essay = () => {
  return instance({
    url: `/user/essay/collect`,
    method: "GET"
  });
};

/****
 * 签到 api
 */
// 用户签到
export const set_user_sign = () => {
  return instance({
    url: "/user/sign",
    method: "POST"
  });
};

// 查询今日是否签到
export const get_user_sign = () => {
  return instance({
    url: "/user/sign",
    method: "GET"
  });
};

/****
 * 点赞、收藏 api
 */
// 点赞文章
export const like_essay = (options) => {
  return instance({
    url: `/essay/${options.id}/like`,
    method: "POST"
  });
};

// 取消点赞文章
export const dislike_essay = (options) => {
  return instance({
    url: `/essay/${options.id}/like`,
    method: "DELETE"
  });
};

// 收藏文章
export const collect_essay = (options) => {
  return instance({
    url: `/essay/${options.id}/collect`,
    method: "POST"
  });
};

// 取消收藏文章
export const discollect_essay = (options) => {
  return instance({
    url: `/essay/${options.id}/collect`,
    method: "DELETE"
  });
};
