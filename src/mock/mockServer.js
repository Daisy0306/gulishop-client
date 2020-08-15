// 模拟数据接口，可以理解为这个文件是创建的模拟的后端服务
import mock from "mockjs";
import banner from './banner.json';
import floor from "@/mock/floor";

// 这个方法用来模拟接口用
// 参数：①模拟的接口类路径；②返回的数据
mock.mock('/mock/banner', {
    code: 200,
    data: banner
});
mock.mock("/mock/floor", {
    code: 200,
    data: floor
});