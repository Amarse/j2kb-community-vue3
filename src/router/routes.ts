import LoginView from "@/views/LoginView.vue"
const routes = [
    {
        path: "/",
        redirect: "login"
    },
    {
        path: "/login",
        name: "login",
        component: LoginView,
    },
];

export default routes;