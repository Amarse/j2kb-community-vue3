import LoginView from "@/views/LoginView.vue";
import SignUpView from "@/views/SignUpView.vue";
const routes = [
  {
    path: "/",
    redirect: "login",
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/sign-up",
    name: "sign-up",
    component: SignUpView,
  },
];

export default routes;
