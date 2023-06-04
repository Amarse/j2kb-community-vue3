<template>
  <header class="flex justify-content-between">
    <p class="w-10 flex align-items-center">
      <button @click="back">
        <i class="pi pi-chevron-left"></i>
      </button>
      <InputText
        v-model="searchKeyword"
        placeholder="검색어 입력"
        @keydown.prevent.enter="search"
        class="border-none w-10"
      />
    </p>
    <button @click="search">
      <i class="pi pi-search"></i>
    </button>
  </header>
  <hr class="m-0" />
  <main class="post-list-wrapper">
    <p v-if="postList.length === 0" class="enter-keyword-message">
      {{ message }}
    </p>
    <section v-else class="scroll-wrapper">
      <PostList
        v-for="post in postList"
        :post="post"
        @view="moveToPostDetailView"
      />
    </section>
  </main>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { TPost } from "@/assets/models/TPost";
import { computed } from "vue";
import router from "@/router";
import InputText from "primevue/inputtext";
import PostList from "@/components/post/PostList.vue";

const message = computed(() => {
  if (isSearch.value) return "검색 결과를 찾을 수 없습니다.";
  else return "검색어를 입력해주세요.";
});

// variable
const searchKeyword = ref<string>("");
const isSearch = ref<boolean>(false);
const postList = ref<TPost[]>([]);

// methods
const back = () => {
  router.back();
};

const search = () => {
  // todo something
  // search post
  isSearch.value = !isSearch.value;

  // #test
  postList.value = [
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
};

// methods
const moveToPostDetailView = (id: string) => {
    router.push(`/detail/${id}`)
}
</script>
<style lang="scss" scoped>
:deep(.p-inputtext) {
  padding-top: 0;
  padding-bottom: 0;
  font-size: rem(32px);
  color: $gray600;
}

.not-found-message,
.enter-keyword-message {
  display: flex;
  justify-content: center;
  margin-top: rem(204px);
  font-style: normal;
  font-weight: 400;
  font-size: rem(20px);
  line-height: rem(24px);
  color: $gray600;
}

.post-list-wrapper {
  height: calc(100% - rem($header-height));
  overflow-y: auto;
}
</style>
