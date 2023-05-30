<template>
  <div class="w-full h-full">
    <main class="main">
      <p class="flex justify-content-between align-items-center p-5 font-black">
        <span class="text-5xl">대나무숲</span>
        <button aria-label="hamburger" class="hamburger-button">
          <i class="pi pi-bars" />
        </button>
      </p>
      <hr class="m-0" />
      <router-view />
    </main>
    <footer class="footer">
      <button
        v-for="(tab, index) in tabMenu"
        :aria-label="tab.label"
        class="flex-grow-1"
        @click="changeTab(tab.link, index)"
        :class="['flex-grow-1', isActive(index)]"
      >
        <i :class="tab.icon" />
      </button>
    </footer>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import router from "@/router";

// variables
const activeIndex = ref<number>(0);

const tabMenu = [
  {
    icon: "pi pi-home",
    label: "board",
    link: "/main/board",
  },
  {
    icon: "pi pi-search",
    label: "search",
    link: "/search",
  },
  {
    icon: "pi pi-plus-circle",
    label: "post",
    link: "/post",
  },
  {
    icon: "pi pi-heart",
    label: "hot",
    link: "/main/hot",
  },
  {
    icon: "pi pi-user",
    label: "user",
    link: "/main/update-profile",
  },
];

// methods
const changeTab = (link: string, index: number) => {
  activeIndex.value = index;
  router.push(link);
};

const isActive = (index: number) => {
  if (activeIndex.value === index) {
    return "active";
  } else {
    return "";
  }
};
</script>
<style lang="scss" scoped>
hr {
  height: rem(1px);
  border: 0;
  background: $gray100;
}

button {
  border: none;
  background: white;

  :deep(.pi) {
    color: $black;
    font-size: rem(44px);
  }
}

button.hamburger-button {
  :deep(.pi) {
    font-size: rem(24px);
  }
}

.main {
  width: 100%;
  height: calc(100% - rem($header-height));
}

.footer {
  width: 100%;
  height: rem($header-height);
  display: flex;
  border-top: rem(1px) solid $gray100;
  box-sizing: border-box;

  .active {
    :deep(.pi) {
      color: $blue;
    }
  }
}
</style>
