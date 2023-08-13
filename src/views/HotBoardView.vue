<template>
  <header>
    <p class="flex justify-content-between align-items-center black">
      <span class="text-3xl font-medium">HOT</span>
      <button aria-label="hamburger" class="hamburger-button" @click="back">
        <i class="pi pi-bars" />
      </button>
    </p>
  </header>
  <PostCard v-for="post in postList" :post="post"></PostCard>
</template>
<script lang="ts" setup>
import { TPost } from "@/assets/models/TPost";
import PostCard from "@/components/post/PostCard.vue";
import router from "@/router";
import FirebaseDatabase from "@/services/FirebaseDatabase";
import { onBeforeUnmount, ref } from "vue";

const HOT_POST_LIKES = 10;

const back = () => {
  router.back();
};

const postList = ref<TPost[]>([]);
const database = ref<FirebaseDatabase | null>(null);

onBeforeUnmount(() => {
  database.value = null;
});

// methods
const init = () => {
  database.value = new FirebaseDatabase();
  load();
};

const load = async () => {
  const snapshot = await database.value?.queryOrderBy("posts", "created_at");
  try {
    snapshot?.forEach((child) => {
      if (child.val().likes !== undefined && child.val().likes.length >= HOT_POST_LIKES) {
        postList.value.push({
          post_id: child.val().post_id,
          category: child.val().category,
          categoryKorean: child.val().categoryKorean,
          email: child.val().email,
          nickname: child.val().nickname,
          content: child.val().content,
          views: child.val().views,
          likes: child.val().likes,
          reply_ids:
            child.val().reply_ids === undefined ? [] : child.val().reply_ids,
          created_at: child.val().created_at,
        });
      }
    });

    postList.value.reverse();
  } catch (error: any) {
    console.error(error);
  }
};

init();
</script>
<style lang="scss" scoped></style>
