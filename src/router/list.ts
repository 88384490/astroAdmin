export default {
  path: "list",
  name: "list",
  meta: {
    title: "标准列表",
  },
  desc: "",
  component: () => import("@/views/list/Index.vue"),
  children: [
    {
      path: "list-table",
      name: "list-table",
      meta: {
        title: "查询表格",
        desc: "",
      },
      component: () => import("@/views/list/ListTable.vue"),
    },
    {
      path: "list-standard",
      name: "list-standard",
      meta: {
        title: "卡片列表",
        desc: "",
      },
      component: () => import("@/views/list/ListStandard.vue"),
    },
    {
      path: "list-card",
      name: "list-card",
      meta: {
        title: "卡片列表",
        desc: "",
      },
      component: () => import("@/views/list/ListCard.vue"),
    },
  ],
};
