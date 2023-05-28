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
  </main>
</template>

<script lang="ts" setup>
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
</style>
