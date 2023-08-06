<template>
  <PostCard
    v-for="(post, index) in postList"
    :post="post"
    :key="index"
  ></PostCard>
</template>
<script lang="ts" setup>
import { onBeforeUnmount, ref } from "vue";
import { TPost } from "@/assets/models/TPost";
import FirebaseDatabase from "@/services/FirebaseDatabase";
import PostCard from "@/components/post/PostCard.vue";

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
    });

    postList.value.reverse();

  } catch (error: any) {
    console.error(error);
  }
};

init();
</script>
<style lang="scss" scoped></style>
