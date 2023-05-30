import LoginView from "@/views/LoginView.vue";
import SignUpView from "@/views/SignUpView.vue";
import MainView from "@/views/MainView.vue";
import BoardView from "@/views/BoardView.vue";
import AllBoardView from "@/views/AllBoardView.vue";
import HotBoardView from "@/views/HotBoardView.vue";
import StudyBoardView from "@/views/StudyBoardView.vue";
import QuestionBoardView from "@/views/QuestionBoardView.vue";
import PostView from "@/views/PostView.vue";
import UpdateProfileView from "@/views/UpdateProfileView.vue";

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
  {
    path: "/main",
    name: "main",
    redirect: "/main/board",
    component: MainView,
    children: [
      {
        path: "board",
        name: "board",
        redirect: "/main/board/all",
        component: BoardView,
        children: [
          {
            path: "all",
            name: "board-all",
            component: AllBoardView,
          },
          {
            path: "study",
            name: "board-study",
            component: StudyBoardView,
          },
          {
            path: "question",
            name: "board-question",
            component: QuestionBoardView,
          },
        ],
      },
      {
        path: "hot",
        name: "hot",
        component: HotBoardView,
      },
      {
        path: "update-profile",
        name: "update-profile",
        component: UpdateProfileView,
      },
    ],
  },
  {
    path: "/post",
    name: "post",
    component: PostView,
  },
];

export default routes;
