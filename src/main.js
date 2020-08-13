import Vue from "vue";
// @ 代表 src文件夹
import App from "@/App";
import router from "@/router";
import TopNav from "@/components/TopNav";
import store from "@/store";

import "@/api"; // 为了测试用的

Vue.config.productionTip = false;
// 注册全局组件
Vue.component("TopNav", TopNav);

new Vue({
  router,
  el: "#app",
  render: (h) => h(App),
  store
});