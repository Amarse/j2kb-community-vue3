<template>
  <header class="flex justify-content-between">
    <p class="w-10 flex align-items-center">
      <button @click="back">
        <i class="pi pi-chevron-left pr-2"></i>
      </button>
      <InputText
        v-model="searchKeyword"
        placeholder="검색어 입력"
        @keydown.prevent.enter="search"
        class="border-none w-10 text-3xl font-black"
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
      <PostCard v-for="post in postList" :post="post" />
    </section>
  </main>
</template>
<script lang="ts" setup>
import { onBeforeUnmount, ref } from "vue";
import { TPost } from "@/assets/models/TPost";
import { computed } from "vue";
import router from "@/router";
import InputText from "primevue/inputtext";
import PostCard from "@/components/post/PostCard.vue";
import FirebaseDatabase from "@/services/FirebaseDatabase";

// variable
const searchKeyword = ref<string>("");
const message = ref<string>("");
const postList = ref<TPost[]>([]);
const database = ref<FirebaseDatabase | null>(null);

// computed
const resultMessage = computed({
  get() {
    return message.value;
  },
  set(value: string) {
    message.value = value;
  },
});

onBeforeUnmount(() => {
  database.value = null;
});

// methods
const init = () => {
  resultMessage.value = "검색어를 입력해주세요.";
  database.value = new FirebaseDatabase();
};

const back = () => {
  router.back();
};

const search = async () => {
  postList.value = [];
  if (searchKeyword.value.length < 2) {
    resultMessage.value = "2글자 이상 입력해주세요.";
    return;
  }
  try {
    const snapshot = await database.value?.queryEqualTo("posts", "content");
    snapshot?.forEach((child) => {
      if (child.val().content.includes(searchKeyword.value)) {
        postList.value.push({
          post_id: child.val().post_id,
          category: child.val().category,
          categoryKorean: child.val().categoryKorean,
          email: child.val().email,
          nickname: child.val().nickname,
          content: child.val().content,
          views: child.val().views,
          likes: child.val().likes === undefined ? [] : child.val().likes,
          reply_ids:
            child.val().reply_ids === undefined ? [] : child.val().reply_ids,
          created_at: child.val().created_at,
        });
      }
    });

    postList.value.reverse();

    if (postList.value.length === 0) {
      resultMessage.value = "검색 결과를 찾을 수 없습니다.";
    }
  } catch (error: any) {
    console.error(error);
  }
};

init();
// methods
</script>
<style lang="scss" scoped>
:deep(.p-inputtext) {
  padding-top: 0;
  padding-bottom: 0;
  font-size: rem(32px);
  color: $black;
  &::placeholder {
    color: $gray600;
  }
}

:deep(.pi) {
  vertical-align: bottom;
  cursor: pointer;
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

.list-padding {
  padding: rem(28px) rem(40px);
}
.text-truncate {
  @include text-truncate(1, 1.5);
}
</style>
