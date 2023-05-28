<template>
  <div class="home-view-wrapper">
    <main class="main w-full">
      <p class="flex justify-content-between align-items-center p-5 font-black">
        <span class="text-5xl">대나무숲</span>
        <Button
          icon="pi pi-bars"
          aria-label="Filter"
          text
          class="hamburger-icon"
        />
      </p>
      <hr class="m-0"/>
      <router-view />
    </main>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import Button from "primevue/button";
const nickname = ref<string>("");

// #test
nickname.value = "담담";
</script>
<style lang="scss" scoped>
.home-view-wrapper {
  width: 100%;

  hr {
    height: rem(1px);
    border:0;
    background: $gray100;
  }
}

.hamburger-icon:deep(.pi) {
  color: black;
  font-size: rem(24px);
}
</style>
