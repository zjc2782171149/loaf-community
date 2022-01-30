import instance from "../utils/request";

/**
 * 个人资料页面
 */
// 获取用户发表的文章列表，非本人
export const get_user_essay = (options) => {
  return instance({
    url: `/user/${options.id}/essay/list`,
    method: "GET"
  });
};

/**
 * 主页面
 */
// 获取用户的草稿箱列表
export const get_draftBox_essay = (options) => {
  return instance({
    url: `/user/${options.id}/save/list`,
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

//////////////////////////////

// 新增文章
export const add_essay = (options) => {
  return instance({
    url: `/essay`,
    method: "POST",
    data: options
  });
};

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

// 新增草稿箱文章
export const add_draftBox_essay = (options) => {
  return instance({
    url: `/essay/save`,
    method: "POST",
    data: options
  });
};
