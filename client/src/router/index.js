import Vue from "vue";
import VueRouter from "vue-router";
import Vocabulary from "../views/Vocabulary.vue";
import { authGuard } from "../auth/authGuard";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Vocabulary,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(authGuard);

export default router;
