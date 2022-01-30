import instance from "../utils/request";

// 账户注册
export const user_register = (options) => {
  return instance({
    url: `/register`,
    method: "POST",
    data: options
  });
};

// 账户登录
export const user_login = (options) => {
  return instance({
    url: `/login`,
    method: "POST",
    data: options
  });
};
