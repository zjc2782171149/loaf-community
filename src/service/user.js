import instance from "../utils/request";

// 通过 token 来获取用户信息
export const get_user_info = () => {
  return instance({
    url: "/user/info",
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

// 上传用户头像
export const set_user_avatar = (options) => {
  return instance({
    url: "/user/avatar/upload",
    method: "POST",
    data: options
  });
};

// 用户签到
export const set_user_sign = () => {
  return instance({
    url: "/user/sign",
    method: "POST"
  });
};

// 获取用户发表话题列表
export const get_user_topic = () => {
  return instance({
    url: "/user/topic",
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
    method: "GET"
  });
};

// 取消关注
export const delete_user_follow = (options) => {
  return instance({
    url: `/user/follow/${options.id}`,
    method: "DELETE"
  });
};
