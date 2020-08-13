// 就是我们发送ajax请求的模块
// 目的是为了对axios进行二次封装
/** 
 * 思路： 1.配置基础路径和时间超时
 *        2. 添加进度条信息 nprogress
 *        3. 返回的响应不再需要从data属性当中拿数据，而是响应就是我们要的数据
 * */

// 一般我们在二次封装axios的时候不会直接在axios上改动
// 而是通过create创建一个新的axios实例进行操作

import axios from "axios";
// 进度条处理 nprogress
import NProgress from "nprogress";
// 使用nprogress 需要引入js和css文件，也可以在main.js引入
import 'nprogress/nprogress.css';

// 1. 创建一个新的 axios 实例
const instance = axios.create({
    // 配置请求基础路径
    baseURL: '/api',
    // 配置请求超时时间
    timeout: 15000,
});

// 请求和响应拦截器
// 请求拦截器当中添加打开进度条的功能
// 请求拦截器中失败的回调函数不用处理
instance.interceptors.request.use(config => {
    // 2.  添加额外的功能（使用进度条）
    //     处理config（请求报文）
    NProgress.start();
    // 返回这个 config，请求继续发送，发送的报文信息就是新的config对象
    return config;
});

// 响应拦截器修改响应为直接返回的数据，不需要 .data.data
instance.interceptors.response.use(response => {
        // 3. 默认返回的是 response，也就是我们的响应报文信息，如果我们要拿到数据，response.data中去获取
        //    现在我们是在返回响应之前把响应直接改成了数据，以后我们拿数据不需要再去.data了
        //进度条处理
        NProgress.done();
        // console.log(response.data.data);
        return response.data;
    },
    error => {
        NProgress.done();
        alert("发送请求失败:" + error.message || "未知错误");
        //4. 如果你需要进一步去处理这个错误，那么就返回一个失败的promise
        //   new Error()  ==>  自定义错误信息
        //   return Promise.reject(new Error("请求失败"))

        // 如果你不需要再去处理这个错误，那么就返回一个pending状态的promise（终止promise链）
        return new Promise(() => {});
    });

// 暴露出去我们的axios工具，后面发请求使用
export default instance;