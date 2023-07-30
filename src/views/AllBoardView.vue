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
  load(null);
};

const load = async (category: string | null) => {
  const snapshot = await database.value?.getSnapshotChild("posts", "category");
  try {
    snapshot?.forEach((child) => {
      if (category === null) {
        postList.value.push({
          post_id: child.val().post_id,
          category: child.val().category,
          categoryKorean: child.val().categoryKorean,
          writer: child.val().writer,
          content: child.val().content,
          views: child.val().views,
          likes: child.val().likes,
          reply_ids:
            child.val().reply_ids === undefined ? [] : child.val().reply_ids,
          created_at: child.val().created_at,
        });
      } else if (child.val().category === category) {
        postList.value.push({
          post_id: child.val().post_id,
          category: child.val().category,
          categoryKorean: child.val().categoryKorean,
          writer: child.val().writer,
          content: child.val().content,
          views: child.val().views,
          likes: child.val().likes,
          reply_ids:
            child.val().reply_ids === undefined ? [] : child.val().reply_ids,
          created_at: child.val().created_at,
        });
      }
    });
  } catch (error: any) {
    console.error(error);
  }
};

init();
</script>
<style lang="scss" scoped></style>
