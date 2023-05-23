<template>
  <nav v-show="isNavVisible" class="nav h-full p-5 font-black">
    <p class="mb-5 text-2xl">
      <span class="font-bold">{{ nickname }}</span> 님 환영합니다!
    </p>
    <ul>
      <li
        v-for="menu in menus"
        :class="[
          'flex',
          'my-4',
          'text-lg',
          'align-items-center',
          'column-gap-2',
          activeCheck(menu.link),
        ]"
        @click="goToMenuView(menu.link)"
      >
        <i :class="menu.icon" />
        <span>{{ menu.name }}</span>
      </li>
    </ul>
    <button class="nav-close-button" @click="changeNavVisibleState">
      <i class="pi pi-times text-2xl" />
    </button>
  </nav>
  <main class="main w-full">
    <div v-show="isNavVisible" class="dimmed"></div>
    <p class="flex justify-content-between align-items-center p-5 font-black">
      <span class="text-5xl">대나무숲</span>
      <button @click="changeNavVisibleState">
        <i class="pi pi-bars text-2xl" />
      </button>
    </p>
    <router-view />
  </main>
</template>
<script lang="ts" setup>
import router from "@/router";
import { ref } from "vue";
import { useRoute } from "vue-router";

const nickname = ref<string>("");

const menus = [
  {
    name: "게시판",
    link: "/home/board",
    icon: "pi pi-th-large",
  },
  {
    name: "글 작성하기",
    link: "/home/post/write",
    icon: "pi pi-pencil",
  },
  {
    name: "내가 쓴 글 보기",
    link: "/home/view-my/post",
    icon: "pi pi-file",
  },
  {
    name: "내가 쓴 댓글 보기",
    link: "/home/view-my/comment",
    icon: "pi pi-comment",
  },
  {
    name: "정보 수정",
    link: "/home/update-profile",
    icon: "pi pi-user-edit",
  },
];

const route = useRoute();

const isNavVisible = ref<boolean>(false);

//methods
const activeCheck = (link: string): string => {
  // 게시판의 경우 탭 별 url이 다르기 때문에 /home/board가 포함되면 font-black을 리턴하도록 한다.
  if(link.includes("/home/board")) {
    return "font-black";
  }

  return route.path === link ? "font-black" : "font-gray-800";
};

const goToMenuView = (link: string) => {
  router.push(`${link}`);
};

const changeNavVisibleState = () => {
  isNavVisible.value = !isNavVisible.value;
};

// #test
nickname.value = "담담";
</script>
<style lang="scss" scoped>
.nav {
  position: fixed;
  right: rem(0px);
  top: rem(0px);
  width: rem(362px);
  background-color: white;
  z-index: 1000;

  .nav-close-button {
    position: fixed;
    top: rem(32px);
    right: rem(32px);
    padding: rem(0px);
  }
}

.main {
  position: relative;
  top: rem(0px);
  left: rem(0px);
  z-index: 0;

  .dimmed {
    position: fixed;
    top: rem(0px);
    left: rem(0px);

    width: 100%;
    height: 100%;

    background-color: $gray900;
    opacity: calc(1 - 0.76);

    z-index: 999;
  }
}

button {
  box-sizing: border-box;
  border: none;
  background-color: transparent;
}
</style>
