import Vue from "vue";
import VueRouter from "vue-router";
import routes from "@/router/routes";

// 声明使用插件，vue的插件都要去声明使用
Vue.use(VueRouter); 

const router = new VueRouter({
    routes
});
export default router;// 暴露的是路由器对象