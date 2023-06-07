<template>
  <header>
    <p class="flex justify-content-between align-items-center black">
      <span class="text-3xl font-medium">대나무숲</span>
      <button aria-label="hamburger" class="hamburger-button">
        <i class="pi pi-bars" />
      </button>
    </p>
  </header>

  <PostCard v-for="post, index in postList" :post="post" :key="index"></PostCard>
</template>
<script lang="ts" setup>
import { TPost } from "@/assets/models/TPost";
import PostCard from "@/components/post/PostCard.vue";
// #test
const postList: TPost[] = [
  {
    post_id: "test1",
    writer: "박소담",
    content: `대나무 숲을 만들어보자.대나무 숲을 만들어보자.대나무 숲을
      만들어보자.대나무 숲을 만들어보자.대나무 숲을 만들어보자.대나무 숲을
      만들어보자.대나무 숲을 만들어보자.대나무 숲을 만들어보자.대나무 숲을
      만들어보자.대나무 숲을 만들어보자.대나무 숲을 만들어보자.대나무 숲을
      만들어보자.대나무 숲을 만들어보자.대나무 숲을 만들어보자.대나무 숲을
      만들어보자.대나무 숲을 만들어보자.대나무 숲을 만들어보자.`,
    views: 0,
    likes: 0,
    created_at: "2023-05-22 13:18",
    reply_ids: [],
  },
  {
    post_id: "test2",
    writer: "박소담",
    content: `대나무 숲을 만들어보자.대나무 숲을 만들어보자.대나무 숲을
      만들어보자.대나무 숲을 만들어보자.대나무 숲을 만들어보자.대나무 숲을
      만들어보자.대나무 숲을 만들어보자.대나무 숲을 만들어보자.대나무 숲을
      만들어보자.대나무 숲을 만들어보자.대나무 숲을 만들어보자.대나무 숲을
      만들어보자.대나무 숲을 만들어보자.대나무 숲을 만들어보자.대나무 숲을
      만들어보자.대나무 숲을 만들어보자.대나무 숲을 만들어보자.`,
    views: 0,
    likes: 0,
    created_at: "2023-05-22 13:18",
    reply_ids: [],
  },
];
</script>
<style lang="scss" scoped>
</style>
