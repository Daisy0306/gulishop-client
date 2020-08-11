import Vue from "vue";
// @ 代表 src文件夹
import App from "@/App";

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  render: (h) => h(App),
});