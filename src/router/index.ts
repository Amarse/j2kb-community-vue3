import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

router.beforeEach(async (to, from, next) => {
  const user = localStorage.getItem("user");

  if(to.meta.requiresAuth) {
    if(user === null) {
      console.log(to.meta.requiresAuth);
      return next("/login");
    }
  }
  next();
});

export default router;
