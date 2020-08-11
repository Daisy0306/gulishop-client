import Vue from "vue";
// @ 代表 src文件夹
import App from "@/App";
import router from "@/router";

Vue.config.productionTip = false;

new Vue({
  router,
  el: "#app",
  render: (h) => h(App),
});