<template>
  <header>
    <p class="flex justify-content-between align-items-center black">
      <span class="text-3xl font-medium">HOT</span>
      <button aria-label="hamburger" class="hamburger-button" @click="back">
        <i class="pi pi-bars" />
      </button>
    </p>
  </header>

  <PostList
    v-for="(post, index) in postList"
    :post="post"
    :key="index"
    @view="moveToPostDetailView"
  ></PostList>
</template>
<script lang="ts" setup>
import { TPost } from '@/assets/models/TPost';
import PostList from '@/components/post/PostList.vue';
import router from '@/router';

const back = () => {
  router.back();
};

// #test
const postList: TPost[] = [
  {
    post_id: 'test1',
    writer: '박소담',
    category: '스터디/모임',
    content: `대나무 숲을 만들어보자.대나무 숲을 만들어보자.대나무 숲을
      만들어보자.대나무 숲을 만들어보자.대나무 숲을 만들어보자.대나무 숲을
      만들어보자.대나무 숲을 만들어보자.대나무 숲을 만들어보자.대나무 숲을
      만들어보자.대나무 숲을 만들어보자.대나무 숲을 만들어보자.대나무 숲을
      만들어보자.대나무 숲을 만들어보자.대나무 숲을 만들어보자.대나무 숲을
      만들어보자.대나무 숲을 만들어보자.대나무 숲을 만들어보자.`,
    views: 0,
    likes: 0,
    created_at: '2023-05-22 13:18',
    reply_ids: [],
  },
  {
    post_id: 'test2',
    writer: '박소담',
    category: '개발 질문',
    content: `대나무 숲을 만들어보자.대나무 숲을 만들어보자.대나무 숲을
      만들어보자.대나무 숲을 만들어보자.대나무 숲을 만들어보자.대나무 숲을
      만들어보자.대나무 숲을 만들어보자.대나무 숲을 만들어보자.대나무 숲을
      만들어보자.대나무 숲을 만들어보자.대나무 숲을 만들어보자.대나무 숲을
      만들어보자.대나무 숲을 만들어보자.대나무 숲을 만들어보자.대나무 숲을
      만들어보자.대나무 숲을 만들어보자.대나무 숲을 만들어보자.`,
    views: 0,
    likes: 0,
    created_at: '2023-05-22 13:18',
    reply_ids: [],
  },
];

const moveToPostDetailView = (id: string) => {
  router.push(`/detail/${id}`);
};

</script>
<style lang="scss" scoped></style>
