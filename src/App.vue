<template>
  <div class="w-screen h-screen">
    <router-view />
  </div>
</template>

<script lang="ts" setup>
import dayjs from "dayjs";
import "dayjs/locale/ko";
dayjs.locale("ko");
</script>

<style lang="scss"></style>
