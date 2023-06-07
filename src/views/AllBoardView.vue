<template>
  <PostCard v-for="post,index in postList" :post="post" :key="index"></PostCard>
</template>
<script lang="ts" setup>
import { TPost } from "@/assets/models/TPost";
import PostCard from "@/components/post/PostCard.vue";
// #test
const postList: TPost[] = [
  {
    post_id: "test1",
    category : "스터디/모임",
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
    category : "개발 질문",
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
<style lang="scss" scoped></style>
