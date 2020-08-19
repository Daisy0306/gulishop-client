import Vue from "vue";
// @ 代表 src文件夹
import App from "@/App";
import router from "@/router";
import TopNav from "@/components/TopNav";
import SliderLoop from "@/components/SliderLoop";
import Pagination from "@/components/Pagination";
import store from "@/store";

import "swiper/css/swiper.min.css";
// 引入模拟接口数据 mock
import "@/mock/mockServer";

import "@/api"; // 为了测试用的

Vue.config.productionTip = false;
// 注册全局组件
Vue.component("TopNav", TopNav);
Vue.component("SliderLoop", SliderLoop);
Vue.component("Pagination", Pagination);

new Vue({
  router,
  el: "#app",
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  render: (h) => h(App),
  store
});