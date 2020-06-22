import router from "@/router/index";
import { Route } from "vue-router";

const whiteList = ["/login"];

router.beforeEach(async (to: Route, from: Route, next: any) => {
  next();
});
