import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "ant-design-vue/dist/antd.css";
import "element-ui/lib/theme-chalk/index.css";
import "./permission";

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
