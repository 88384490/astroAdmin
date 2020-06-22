export default {
  path: "info",
  name: "info",
  meta: {
    title: "基础管理",
  },
  desc: "",
  component: () => import("@/views/info/Index.vue"),
  children: [
    {
      path: "encyclopedia",
      name: "encyclopedia",
      meta: {
        title: "星座百科",
        desc: "用于管理小程序星座百科资料",
      },
      component: () => import("@/views/info/Encyclopedia/Encyclopedia.vue"),
    },
    {
      path: "fortune",
      name: "fortune",
      meta: {
        title: "星座运势",
        desc: "用于管理小程序星座运势资料",
      },
      component: () => import("@/views/info/Fortune/Fortune.vue"),
    },
    {
      path: "strategy",
      name: "strategy",
      meta: {
        title: "星座攻略",
        desc: "用于管理小程序星座攻略资料",
      },
      component: () => import("@/views/info/Strategy/Stratey.vue"),
    },
  ],
};
