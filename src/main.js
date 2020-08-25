import Vue from "vue";
// @ 代表 src文件夹
import App from "@/App";
import router from "@/router";
import TopNav from "@/components/TopNav";
import SliderLoop from "@/components/SliderLoop";
import Pagination from "@/components/Pagination";
import store from "@/store";
import * as API from "@/api";

import "swiper/css/swiper.min.css";
// 引入模拟接口数据 mock
import "@/mock/mockServer";

// 部分引入 element-ui当中的 MessageBox,Message
import {
  Message,
  MessageBox
} from "element-ui";
// 声明使用或者注册
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;

// import "@/api"; // 为了测试用的

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
    Vue.prototype.$API = API
  },
  render: (h) => h(App),
  store
});