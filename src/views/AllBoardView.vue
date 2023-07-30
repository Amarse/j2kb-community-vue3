<template>
  <PostCard
    v-for="(post, index) in postList"
    :post="post"
    :key="index"
  ></PostCard>
</template>
<script lang="ts" setup>
import { TPost } from "@/assets/models/TPost";
import PostCard from "@/components/post/PostCard.vue";
import FirebaseDatabase from "@/services/FirebaseDatabase";
import { onBeforeMount, onBeforeUnmount, ref } from "vue";
const postList = ref<TPost[]>([]);
const database = ref<FirebaseDatabase | null>(null);

// lifecycle
onBeforeMount(() => {
  database.value = new FirebaseDatabase();
  load(null);
});

onBeforeUnmount(() => {
  database.value = null;
});

// methods
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
</script>
<style lang="scss" scoped></style>
