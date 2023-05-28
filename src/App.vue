<template>
  <div class="wrapper w-screen h-screen">
    <router-view />
  </div>
</template>

<script lang="ts" setup>
import dayjs from "dayjs";
import "dayjs/locale/ko";
dayjs.locale("ko");
</script>

<style lang="scss">
.wrapper {
  min-width: rem(375px);
  max-width: rem(768px);
  margin: 0 auto;
  border: rem(1px) solid $gray500;
}
</style>
