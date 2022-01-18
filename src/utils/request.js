import axios from "axios";
const baseUrl = "";

const request = axios.create({
  baseURL: baseUrl,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Authorization: ""
  }
});

// 请求拦截器
request.interceptors.request.use(
  (request) => {
    if (localStorage.getItem("token")) {
      const token = JSON.parse(localStorage.getItem("token"));
      request.headers["Authorization"] = `${token}`; // 如果有token，每次请求都在axios请求头上进行携带
    } else {
      console.log("删除 token 了");
      delete request.headers["Authorization"]; // 如果本地token没了，就要将请求头中的token删掉，
      // 适用情况：有人手动将application中token删掉，测试还能不能请求成功
    }
    console.log("请求拦截 成功");
    return request;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    // 后端接口判断请求头有无 token，没有或者 token 过期，返回401；
    if (response.data.code === 401) {
      //用户token失效
      console.log("401错误");
      window.localStorage.removeItem("token"); // 移除token
      window.location.href = "/login"; // 重定向到登录页
      return Promise.reject("用户token失效");
    }
    if (response.status !== 200) {
      //接口请求失败，具体根据实际情况判断
      return Promise.reject(
        "除了401和200的错误码，按情况来设置，比如还可以403等等"
      ); //接口Promise返回错误状态
    }
    // 状态码是200时
    return Promise.resolve(response);
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default request;
