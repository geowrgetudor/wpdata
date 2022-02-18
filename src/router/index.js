import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/plugins/:page?",
      name: "plugins",
      component: () => import("../views/PluginsView.vue"),
    },
    {
      path: "/plugin/:slug",
      name: "plugin",
      component: () => import("../views/PluginView.vue"),
    },
    {
      path: "/themes",
      name: "themes",
      component: () => import("../views/ThemesView.vue"),
    },
    {
      path: "/stats",
      name: "stats",
      component: () => import("../views/StatsView.vue"),
    },
  ],
});

export default router;
