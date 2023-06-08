<template>
  <header>
    <p class="flex justify-content-between align-items-center black">
      <span class="text-3xl font-medium font-black">대나무숲</span>
      <button aria-label="hamburger" class="hamburger-button">
        <i class="pi pi-bars" />
      </button>
    </p>
  </header>
  <TabMenu :model="items" class="w-full text-xl font-normal"> </TabMenu>
  <section class="board-list-wrapper">
    <router-view />
  </section>
</template>
<script lang="ts" setup>
import TabMenu from 'primevue/tabmenu';

const items = [
  {
    label: '전체',
    to: '/main/board/all',
  },
  {
    label: '스터디/모임',
    to: '/main/board/study',
  },
  {
    label: '개발 질문',
    to: '/main/board/question',
  },
];
</script>
<style lang="scss" scoped>
:deep(.p-tabmenuitem) {
  flex-grow: 1;

  .p-menuitem-link {
    border-bottom: rem(1px) solid $gray600 !important;
    color: $gray600 !important;
    font-weight: 400 !important;
    height: 4.5rem;
    border: none;
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
    // border-color: $black !important;
    font-weight: 400 !important;
    border-bottom: rem(2px) solid $black !important;
  }
}

.board-list-wrapper {
  height: calc(100% - rem(104px) - rem(58px));
  overflow-y: auto;
}
</style>
