import LoginView from "@/views/LoginView.vue";
import SignUpView from "@/views/SignUpView.vue";
import HomeView from "@/views/HomeView.vue";
import BoardView from "@/views/BoardView.vue";
import AllBoardView from "@/views/AllBoardView.vue";
import HotBoardView from "@/views/HotBoardView.vue";
import StudyBoardView from "@/views/StudyBoardView.vue";
import QuestionBoardView from "@/views/QuestionBoardView.vue";
import PostView from "@/views/PostView.vue";
import PostWriteView from "@/views/PostWriteView.vue";
import ViewMyPostView from "@/views/ViewMyPostView.vue";
import ViewMyCommentView from "@/views/ViewMyCommentView.vue";
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
    path: "/home",
    name: "home",
    component: HomeView,
    redirect: "/home/board",
    children: [
      {
        path: "board",
        name: "board",
        component: BoardView,
        redirect: "/home/board/all",
        children: [
          {
            path: "all",
            name: "board-all",
            component: AllBoardView,
          },
          {
            path: "hot",
            name: "board-hot",
            component: HotBoardView,
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
        path: "post",
        name: "post",
        component: PostView,
        redirect: "/home/post/write",
        children: [
          {
            path: "write",
            name: "post-write",
            component: PostWriteView,
          },
        ],
      },
      {
        path: "view-my",
        name: "view-my",
        children: [
          {
            path: "post",
            name: "view-my-post",
            component: ViewMyPostView,
          },
          {
            path: "comment",
            name: "view-my-comment",
            component: ViewMyCommentView,
          },
        ],
      },
      {
        path: "update-profile",
        name: "update-profile",
        component: UpdateProfileView,
      },
    ],
  },
];

export default routes;
