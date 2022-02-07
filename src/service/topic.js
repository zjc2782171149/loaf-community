import instance from "../utils/request";

/**
 * 个人资料
 */
// 通过 token 来获取用户发表话题列表
export const get_user_topic = () => {
  return instance({
    url: "/user/topic",
    method: "GET"
  });
};

/**
 * 唠嗑圈
 */
// 获取话题分类总列表
export const get_topic_all = () => {
  return instance({
    url: "/topic/list",
    method: "GET"
  });
};

// 获取某个板块的话题列表
export const get_tabs_topic_ = (options) => {
  return instance({
    url: `/topic/list/${options.id}`,
    method: "GET"
  });
};

// 获取话题详情
export const get_topic_detail = (options) => {
  return instance({
    url: `/topic/${options.id}`,
    method: "GET"
  });
};

// 新增话题
export const add_topic = (options) => {
  return instance({
    url: `/topic`,
    method: "POST",
    data: options
  });
};
