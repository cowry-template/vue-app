import { createRouter, createWebHistory } from "vue-router";
import { beforeEach } from "./utils/beforeEach";
import HomeView from "@/views/HomeView.vue";

const Page404 = () => import("@/pages/404");

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",

    component: () => import("@/views/Login/index.vue"),
  },
  {
    path: "/404",
    name: "404",
    component: Page404,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(beforeEach);

export default router;
