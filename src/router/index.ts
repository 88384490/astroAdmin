import Vue from "vue";
import Router from "vue-router";
import Index from "@/views/Index.vue";

import childrens from "@/router/children";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "index",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Index,
      children: childrens,
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/login/Index.vue"),
      meta: { hidden: true, title: "登录" },
    },
  ],
});
