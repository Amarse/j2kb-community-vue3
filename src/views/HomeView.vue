<template>
  <div class="background">
    <img class="bg-cherry" src="@/assets/imgs/cherry.png" />
    <img class="bg-balloon-puppy" src="@/assets/imgs/balloon-puppy.png" />
    <img class="bg-cloud" src="@/assets/imgs/cloud.png" />
    <img class="bg-flower" src="@/assets/imgs/flower.png" />
    <img class="bg-heart" src="@/assets/imgs/heart.png" />
  </div>
  <div class="flex gap-3 p-3">
    <nav class="w-2 border-1 surface-border">
      <p
        class="text-primary p-4 text-center border-bottom-1 surface-border bg-white line-height-2"
      >
        <span class="text-3xl font-bold">{{ nickname }} 님</span><br />
        <span class="text-xl">환영합니다!</span>
      </p>
      <ul>
        <li
          v-for="menu in menus"
          class="p-3 border-bottom-1 surface-border bg-white text-color-secondary"
          @click="goToMenuView(menu.link)"
        >
          {{ menu.name }}
        </li>
      </ul>
    </nav>
    <main>
      <router-view />
    </main>
  </div>
</template>
<script lang="ts" setup>
import router from "@/router";
import { ref } from "vue";

const nickname = ref<string>("");

const menus = [
  {
    name: "게시판",
    link: "/home/board",
  },
  {
    name: "글 작성하기",
    link: "/home/post/write",
  },
  {
    name: "내가 쓴 글 보기",
    link: "/home/view-my/post",
  },
  {
    name: "내가 쓴 댓글 보기",
    link: "/home/view-my/comment",
  },
  {
    name: "정보 수정",
    link: "/home/update-profile",
  },
];

const goToMenuView = (link: string) => {
  router.push(`${link}`);
};

// #test
nickname.value = "담담";
</script>
<style lang="scss" scoped>
.background {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -1;

  img {
    position: absolute;
  }

  .bg-cherry {
    width: 16.25%;
    left: 0%;
    top: 41.388%;
  }
  .bg-balloon-puppy {
    width: 20.208%;
    right: 0%;
    top: 0.833%;
  }
  .bg-cloud {
    width: 18.385%;
    left: 10.885%;
    top: 0.37%;
  }
  .bg-heart {
    width: 12.708%;
    left: 50%;
    bottom: 0%;

    transform: translateX(-50%);
  }
  .bg-flower {
    width: 14.895%;
    right: 4.385%;
    bottom: 3.833%;
  }
}
</style>
