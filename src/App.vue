<template>
  <div class="wrapper w-screen h-screen">
    <router-view />
  </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
dayjs.locale('ko');
</script>

<style lang="scss">
.wrapper {
  min-width: rem(375px);
  max-width: rem(768px);
  margin: 0 auto;
  border: rem(1px) solid $gray500;
  background: white;
}

.wrapper:has(.post-detail) {
  height: 100% !important;
}

header {
  // height: rem($header-height) !important;

  padding: 1.5rem 2rem !important;
  box-sizing: border-box !important;
  background: white;
  font-size: 2.5rem !important;

  button {
    border: none;
    background: white;

    .pi {
      color: $black;
      font-size: rem(24px);
    }
  }
}

hr {
  height: rem(1px);
  border: 0;
  background: $gray100;
}
</style>
