import instance from "../utils/request";

/**
 * 个人资料
 */
// 获取用户收藏的力扣题目列表，本人
export const get_collect_leetCode = () => {
  return instance({
    url: `/user/leetcode/collect`,
    method: "GET"
  });
};

// 获取用户喜欢的力扣题目列表，本人
export const get_like_leetCode = () => {
  return instance({
    url: `/user/leetcode/like`,
    method: "GET"
  });
};

/**
 * 力扣页面
 */
// 获取力扣题目列表
export const get_leetCode_all = () => {
  return instance({
    url: `/leetcode/list`,
    method: "GET"
  });
};

// 获取用户的leetcode信息
export const get_leetCode_self = (options) => {
  return instance({
    url: `/leetcode/${options.id}/info`,
    method: "GET"
  });
};

// 点赞leetcode某个题目
export const like_leetCode = (options) => {
  return instance({
    url: `/leetcode/${options.id}/like`,
    method: "POST"
  });
};

// 取消点赞leetcode某个题目
export const dislike_leetCode = (options) => {
  return instance({
    url: `/leetcode/${options.id}/like`,
    method: "DELETE"
  });
};

// 收藏leetcode某个题目
export const collect_leetCode = (options) => {
  return instance({
    url: `/leetcode/${options.id}/collect`,
    method: "POST"
  });
};

// 取消收藏leetcode某个题目
export const discollect_leetCode = (options) => {
  return instance({
    url: `/leetcode/${options.id}/collect`,
    method: "DELETE"
  });
};

// 完成leetcode某个题目
export const collect_leetCode = (options) => {
  return instance({
    url: `/leetcode/${options.id}/done`,
    method: "POST"
  });
};

// 取消完成leetcode某个题目
export const discollect_leetCode = (options) => {
  return instance({
    url: `/leetcode/${options.id}/done`,
    method: "DELETE"
  });
};
