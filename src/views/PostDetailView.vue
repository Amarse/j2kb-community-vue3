<template>
  <div class="post-detail">
  <header class="flex mb-2">
    <button>
      <i class="pi pi-chevron-left" />
    </button>
    <span class="ml-5">대나무숲</span>
  </header>
  <main class="main flex flex-column gap-2">
    <!-- post area -->
    <section class="relative bg-white wrapper">
      <div class="flex align-items-center mb-4">
        <img
          class="profile-image border-circle mr-3"
          src="https://plus.unsplash.com/premium_photo-1666264200739-caa822df28d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60"
        />
        <p class="flex flex-column gap-2">
          <span class="text-2xl">{{ post.writer }}</span>
          <span class="text-xl"
            >{{ post.created_at }} 조회수 {{ post.views }}</span
          >
        </p>
      </div>
      <p class="line-height-3 content-space">
        {{ post.content }}
      </p>
      <PostOptions @option="selectedPostOption" class="option" />
    </section>
    <!-- comment area -->
    <section>
      <p class="flex justify-content-between  align-items-center p-5 bg-white comment-list-header">
        <span class="text-3xl">전체 댓글</span>
        <div class="flex align-items-center">
          <button @click="commentOrderBy('desc')" :class="orderBy === 'desc' ? 'selected' : ''">최신순</button>
          <Divider layout="vertical" class="custom-divider"/>
          <button @click="commentOrderBy('asc')" :class="orderBy === 'asc' ? 'selected' : ''">등록순</button>
        </div>
      </p>
      <PostReply v-for="reply in replyList" :reply="reply" />
    </section>
  </main>
</div>
</template>
<script lang="ts" setup>
import { TPost, TPostReply } from "@/assets/models/TPost";
import { ref } from "vue";
import { useRoute } from "vue-router";
import PostOptions from "@/components/post/PostOptions.vue";
import Divider from "primevue/divider";
import PostReply from "@/components/post/PostReply.vue";
const route = useRoute();

const post_id: string | undefined = route.params.id?.toString();
const post = ref<TPost>({
  post_id: "",
  writer: "",
  content: "",
  views: 0,
  likes: 0,
  created_at: "",
  reply_ids: [],
});

const replyList = ref<TPostReply[]>([

])
const orderBy = ref<string>("desc");

// methods
const loadPost = (id: string) => {
  // #test
  post.value.post_id = id;
  post.value.writer = "박소담";
  post.value.content = `대나무 숲을 만들어보자.대나무 숲을 만들어보자.대나무 숲을
      만들어보자.대나무 숲을 만들어보자.대나무 숲을 만들어보자.대나무 숲을
      만들어보자.대나무 숲을 만들어보자.대나무 숲을 만들어보자.대나무 숲을
      만들어보자.대나무 숲을 만들어보자.대나무 숲을 만들어보자.대나무 숲을
      만들어보자.대나무 숲을 만들어보자.대나무 숲을 만들어보자.대나무 숲을
      만들어보자.대나무 숲을 만들어보자.대나무 숲을 만들어보자.`;
  post.value.likes = 0;
  post.value.created_at = "2023-05-22 13:18";
  post.value.reply_ids = ["reply1","reply2","reply3"];
  post.value.reply_ids.forEach((id, index) => {
    replyList.value.push({
      post_id: post.value.post_id,
      reply_id: id,
      writer: "김하나",
      content: "안녕하시렵니까?\n안녕하시렵니까?\n안녕하시렵니까?\n안녕하시렵니까?",
      depth: index >= 1 ? 1 : 0,
      bundle_id: 100,
      bundle_order: index >= 1 ? 1 : 0,
      created_at: "2023-05-22 13:18",
    })
  })

  console.log(replyList.value)
};

const selectedPostOption = (option: string) => {
  if (option === "modify") {
    // 수정
    // todo something
  } else {
    // 삭제
    // todo something
  }
};

const commentOrderBy = (_orderBy: string) => {
  orderBy.value = _orderBy;
}

if (post_id !== undefined) {
  loadPost(post_id);
}
</script>
<style lang="scss" scoped>
.post-detail {
  background: #f9f7f3;

  .main {
  height: calc(100% - rem($header-height));
  .wrapper {
    width: 100%;
    height: rem(400px);
    padding: rem(30px) rem($card-padding);
    border: none;

    .option {
      position: absolute;
      top: rem(40px);
      right: rem(16px);
    }

    .content-space {
      padding-left: rem(75px);
    }
  }

  .comment-list-header {
    border-bottom: rem(1px) solid $gray600;
  }

  :deep(.p-divider.p-divider-vertical) {
    margin: rem(0px) rem(18px);
    padding: rem(0);
    min-height: rem(18px);
    height: rem(18px);
  }
}
}


button {
  background: transparent;
  border: none;
}

.selected {
  color:$pink;
}
</style>
