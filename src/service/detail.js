import instance from "../utils/request";

// 根据id获取文章详情
export const get_essay_detail = (options) => {
  return instance({
    url: `/essay/${options.id}`,
    method: "GET"
  });
};

// 根据id获取文章点赞、收藏状态
export const get__essay_status = (options) => {
  return instance({
    url: `/essay/${options.id}/info`,
    method: "GET"
  });
};

// 查看关注列表 --完成
export const get_user_follow = () => {
  return instance({
    url: "/user/follow/list",
    method: "GET"
  });
};

// 获取用户发布的文章列表
export const getThisUserArticleList = (options) => {
  return instance({
    url: "/article_list_user",
    method: "GET",
    data: options
  });
};

// 根据标签获取文章
export const getArticleByTag = (options) => {
  return instance({
    url: "/article_list",
    method: "GET",
    data: options
  });
};

// 点赞文章，传入文章 id，通过token判断用户
export const digArticle = (options) => {
  return instance({
    url: "/article_digg",
    method: "PUT",
    data: options
  });
};

// 收藏文章
export const collectArticle = (options) => {
  return instance({
    url: "/article_like",
    method: "PUT",
    data: options
  });
};
