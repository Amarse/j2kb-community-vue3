<template>
  <PostCard v-for="post in postList" :post="post"></PostCard>
</template>
<script lang="ts" setup>
import { TPost } from "@/assets/models/TPost";
import PostCard from "@/components/post-card/PostCard.vue";
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
    likes: 0,
    created_at: "2023-05-22 13:18",
    reply_ids: [],
  },
];
</script>
<style lang="scss" scoped></style>
