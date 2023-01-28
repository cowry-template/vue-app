import axios from "axios";
import { Message, Modal } from "@arco-design/web-vue";
import { getToken8Store, setToken2Store } from "@/utils/index";
import router from "@/router";
let MessageReturn = null;

const errorStatus = {
  400: "请求错误",
  401: "未授权，请登录",
  403: "拒绝访问",
  404: "请求地址出错",
  408: "请求超时",
  500: "服务器内部错误",
  501: "服务未实现",
  502: "网关错误",
  503: "服务不可用",
  504: "网关超时",
  505: "HTTP版本不受支持",
  "Network Error": "服务器请求连接失败",
};

const handlerError = (error) => {
  if (error.message.includes("timeout")) {
    Message.error("请求超时");
  }
  const { response } = error;
  const status = response?.status || error.message;
  const data = response?.data;
  let message = data?.message || errorStatus[status] || error.message;

  const config = response?.config;

  if (hideMsgUrls.includes(config?.url || "")) {
    message = "";
  }

  if ([401, 530].includes(+status)) {
    setToken2Store("");
    router.replace("/login");
    return;
  }

  try {
    MessageReturn.close();
  } catch (error) {}

  if (message) {
    MessageReturn = Modal.error({
      title: "提示",
      content: message,
    });
  }
  return {
    errData: data,
    message,
    fail: true,
  };
};

const request = axios.create({
  baseURL: process.env.VITE_APP_BASE_API,
  timeout: 50000,
});

request.interceptors.request.use((config) => {
  const token = getToken8Store();
  if (token) {
    config.headers.Authorization = token;
  }

  return config;
}, handlerError);

request.interceptors.response.use((res) => {
  const { data } = res;

  // 返回数据流文件
  if (res.config.responseType == "blob") {
    return res.data;
  }

  if (data.code != 0) {
    if ([401, 530].includes(+data.code)) {
      setToken2Store("");
      router.replace("/login");
      return;
    }

    if (data.message) {
      try {
        MessageReturn.close();
      } catch (error) {}
      MessageReturn = Modal.error({
        title: "提示",
        content: data.message,
      });
    }
    return {
      fail: true,
      message: data.message || "",
      dataRes: data.data,
    };
  }

  if (data.data == null || typeof data.data == "undefined") {
    return data;
  }

  return data.data;
}, handlerError);

export default request;
