<template>
  <header></header>
  <main class="w-full">
    <section class="box">
      <!-- icon -->
      <img src="@/assets/icons/logo.png" class="w-5 block my-0 mx-auto" />
      <article class="w-full flex flex-column gap-3">
        <slot />
      </article>
    </section>
    <section class="fixed right-0 w-5 z-1">
      <img class="w-full" src="@/assets/imgs/computer.png" />
      <Button
        class="j2kb-notion-button"
        label="J2KB Notion 바로가기"
        severity="secondary"
        outlined
      />
    </section>
    <img class="fixed bottom-0 w-full" src="@/assets/imgs/footer.png" />
  </main>
</template>

<script lang="ts" setup>
import Button from "primevue/button";
</script>

<style lang="scss" scoped>
.box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: rem(560px);

  padding: rem(24px);

  border-width: rem(1px);
  border-style: solid;
  border-color: var(--surface-border);
  border-radius: var(--border-radius);

  background-color: white;

  z-index: 2;
}

.j2kb-notion-button {
  position: absolute;
  top: rem(100px);
  right: rem(80px);
  background-color: white !important;
}
</style>
