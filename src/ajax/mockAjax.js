// 从本地发送请求的文件
// 与Ajax.js 文件内容一致，就是发送请求的基础路径不一致

import axios from "axios";
import NProgress from "nprogress";
import 'nprogress/nprogress.css';

// 1. 创建一个新的 axios 实例
const instance = axios.create({
    baseURL: '/mock', //修改为本地请求的路径
    timeout: 15000,
});

// 请求和响应拦截器
instance.interceptors.request.use(config => {
    NProgress.start();
    return config;
});

instance.interceptors.response.use(response => {
        NProgress.done();
        return response.data;
    },
    error => {
        NProgress.done();
        alert("发送请求失败:" + error.message || "未知错误");
        return new Promise(() => {});
    });

export default instance;