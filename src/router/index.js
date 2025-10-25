import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Facts from "../views/Facts.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/facts", name: "Facts", component: Facts }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
