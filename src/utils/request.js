import axios from "axios";
const baseUrl = "http://loaf.youlan-lan.xyz/api/v1";

const request = axios.create({
  baseURL: baseUrl,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Authorization: ""
  }
});

export const uploadFile = axios.create({
  baseURL: baseUrl,
  timeout: 30000,
  headers: {
    "Content-Type": "multipart/form-data"
  }
});

// // 请求拦截器
uploadFile.interceptors.request.use(
  (request) => {
    if (localStorage.getItem("token")) {
      // console.log("有token", localStorage.getItem("token"));
      const token = JSON.parse(localStorage.getItem("token"));
      // console.log(token);
      request.headers["Authorization"] = `Bearer ${token}`; // 如果有token，每次请求都在axios请求头上进行携带
    } else {
      console.log("删除 token 了");
      delete request.headers["Authorization"]; // 如果本地token没了，就要将请求头中的token删掉，
    }
    // console.log("请求拦截 成功");
    return request;
  },
  (error) => Promise.reject(error)
);

// // 请求拦截器
request.interceptors.request.use(
  (request) => {
    if (localStorage.getItem("token")) {
      // console.log("有token", localStorage.getItem("token"));
      const token = JSON.parse(localStorage.getItem("token"));
      // console.log(token);
      request.headers["Authorization"] = `Bearer ${token}`; // 如果有token，每次请求都在axios请求头上进行携带
    } else {
      console.log("删除 token 了");
      delete request.headers["Authorization"]; // 如果本地token没了，就要将请求头中的token删掉，
    }
    // console.log("请求拦截 成功");
    return request;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    console.log(response);
    // 后端接口判断请求头有无 token，没有或者 token 过期，返回403；
    if (response.data.status === 403) {
      //用户token失效
      window.localStorage.removeItem("token"); // 移除token,cookie那里的会自动消失
      window.location.href = "/login"; // 重定向到登录页
      return Promise.reject("用户登录已过期，需重新登录");
    }
    if (response.status !== 200) {
      return Promise.reject("未知错误");
    }
    if (response.data.code === 0 && !response.data.data) {
      return Promise.reject(response.data.msg);
    }
    if (response.data.code !== 0) {
      return Promise.reject(response.data.msg);
    }
    // 状态码是0时
    return Promise.resolve(response.data);
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default request;
