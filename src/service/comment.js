import instance from "../utils/request";

/**
 * 文章板块的评论
 */
// 根据文章id获取文章评论
export const get_essay_comments = (options) => {
  return instance({
    url: `/essay/${options.id}/comment/list`,
    method: "GET"
  });
};

// 新增评论、回复评论
export const add_essay_comments = (options) => {
  return instance({
    url: "/comment",
    method: "POST",
    data: options
  });
};

// 根据评论id删除评论
export const delete_essay_comments = (options) => {
  return instance({
    url: `/comment/${options.id}`,
    method: "DELETE"
  });
};

// 根据评论id点赞评论
export const like_essay_comments = (options) => {
  return instance({
    url: `/comment/${options.id}/like`,
    method: "POST"
  });
};

// 根据评论id取消点赞评论
export const dislike_essay_comments = (options) => {
  return instance({
    url: `/comment/${options.id}/like`,
    method: "DELETE"
  });
};

/**
 * 话题板块的评论
 */
// 根据文章id获取文章评论
export const get_topic_comments = (options) => {
  return instance({
    url: `/topic/${options.id}/comment/list`,
    method: "GET"
  });
};

// 新增评论、回复评论
export const add_topic_comments = (options) => {
  return instance({
    url: "/topic/comment",
    method: "POST",
    data: options
  });
};

// 根据评论id删除评论
export const delete_topic_comments = (options) => {
  return instance({
    url: `/topic/comment/${options.id}`,
    method: "DELETE"
  });
};

// 根据评论id点赞评论
export const like_topic_comments = (options) => {
  return instance({
    url: `/topic/comment/${options.id}/like`,
    method: "POST"
  });
};

// 根据评论id取消点赞评论
export const dislike_topic_comments = (options) => {
  return instance({
    url: `/topic/comment/${options.id}/like`,
    method: "DELETE"
  });
};
