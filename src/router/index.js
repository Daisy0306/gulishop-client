import Vue from "vue";
import VueRouter from "vue-router";
import routes from "@/router/routes";

// 声明使用插件，vue的插件都要去声明使用
Vue.use(VueRouter);
// 保存原来的 push函数（功能），后面修改之后可以找到原来的
const originPush = VueRouter.prototype.push;
const originReplace = VueRouter.prototype.replace;
VueRouter.prototype.push = function (location, onResolved, onRejected) {
    if (onResolved === undefined && onRejected === undefined) {
        return originPush.call(this, location).catch(() => {});
    } else {
        return originPush.call(this, location, onResolved, onRejected);
    }
}

const router = new VueRouter({
    routes,
    //控制跳转过去之后滚动位置在哪里
    scrollBehavior(to, from, savedPosition) {
        return {
            x: 0,
            y: 0
        }
    }
});
export default router; // 暴露的是路由器对象