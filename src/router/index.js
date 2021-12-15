import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Activity from "../views/Activity.vue";
import Restaurant from "../views/Restaurant.vue";
import ScientSpot from "../views/ScientSpot.vue";
import NotFound from "@/components/NotFound";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/activity",
    name: "activity",
    component: Activity,
  },
  {
    path: "/restaurant",
    name: "restaurant",
    component: Restaurant,
  },
  {
    path: "/scientSpot",
    name: "scientSpot",
    component: ScientSpot,
  },
  {
    path: "/:catchAll(.*)",
    component: NotFound,
    name: "NotFound",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
