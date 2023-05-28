<template>
  <TabMenu :model="items" class="w-full"> </TabMenu>
  <section class="board-list-wrapper">
    <router-view />
  </section>
</template>
<script lang="ts" setup>
import TabMenu from "primevue/tabmenu";

const items = [
  {
    label: "전체",
    to: "/home/board/all",
  },
  {
    label: "스터디/모임",
    to: "/home/board/study",
  },
  {
    label: "개발 질문",
    to: "/home/board/question",
  },
];
</script>
<style lang="scss" scoped>
:deep(.p-tabmenuitem) {
  flex-grow: 1;

  .p-menuitem-link {
    color: $gray800 !important;
    font-weight: 400 !important;
    .p-menuitem-text {
      width: 100%;
      display: inline-block;
      text-align: center;
    }
  }
}

:deep(.p-tabmenuitem.p-highlight) {
  .p-menuitem-link {
    color: $black !important;
    border-color: $black !important;
    font-weight: 700 !important;
  }
}

.board-list-wrapper {
    height: calc(100vh - rem(104px) - rem(58px));
    overflow-y: auto;
}
</style>
