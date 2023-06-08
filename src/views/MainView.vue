<template>
  <div class="w-full h-full">
    <main class="main">
      <router-view />
    </main>
    <footer class="footer">
      <button
        v-for="(tab, index) in tabMenu"
        :aria-label="tab.label"
        class="footer-button"
        @click="changeTab(tab.link, index)"
        :class="['footer-button', isActive(index)]"
        :key="index"
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
    link: "/main/search",
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
button {
  border: none;
  background: white;

  :deep(.pi) {
    color: $black;
    font-size: rem(24px);
  }
}

button.hamburger-button {
  :deep(.pi) {
    font-size: rem(24px);
  }
}

.main {
  width: 100%;
  position: relative;
  height: calc(100% - rem($header-height));
}

.footer {
  width: 100%;
  height: rem($footer-height);
  display: flex;
  justify-content: center;
  border-top: rem(1px) solid $gray100;
  box-sizing: border-box;
  .footer-button {
    padding: rem(28px);
  }
  .active {
    :deep(.pi) {
      color: $blue;
    }
  }
}
</style>
