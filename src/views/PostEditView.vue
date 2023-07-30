<template>
  <TemplatePostForm mode="edit" :post="post" @back="back" @edit="edit" />
</template>
<script lang="ts" setup>
import TemplatePostForm from "@/templates/TemplatePostForm.vue";
import { TPost } from "@/assets/models/TPost";
import { onBeforeUnmount, ref } from "vue";
import FirebaseDatabase from "@/services/FirebaseDatabase";
import { useRoute } from "vue-router";
import router from "@/router";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

// variables
const route = useRoute();
const post = ref<TPost>({
  post_id: "",
  writer: "",
  content: "",
  views: 0,
  likes: 0,
  reply_ids: [],
  created_at: "",
  category: "",
  categoryKorean: "",
});
const database = ref<FirebaseDatabase | null>(null);
const post_id: string | undefined = route.params.id?.toString();

database.value = new FirebaseDatabase();

// lifecycle
onBeforeUnmount(() => {
  database.value = null;
});

// methods
const back = () => {
  router.back();
};

const edit = async () => {
  const data: TPost = {
    post_id: post_id,
    category: post.value.category,
    categoryKorean: post.value.categoryKorean,
    writer: post.value.writer, // temp
    content: post.value.content,
    views: post.value.views,
    likes: post.value.likes,
    reply_ids: post.value.reply_ids,
    created_at: post.value.created_at,
    updated_at: dayjs().format().toString(),
  };

  const updates: any = {};
  updates["/posts/" + post_id] = data;

  await database.value?.update(updates);
};

const loadPost = async (id: string) => {
  const snapshot = await database.value?.getSnapshotChild("posts", "post_id");
  try {
    snapshot?.forEach((child) => {
      if (child.val().post_id === id) {
        post.value = {
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
        };
      }
    });
  } catch (error) {
    console.log(error);
  }
};

if (post_id !== undefined) {
  loadPost(post_id);
}
</script>
<style lang="scss" scoped>
.post-view-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
  background: $gray100;
}
</style>
<style>
.p-dropdown-panel {
  border-radius: 0px !important;
}

.p-dropdown-panel > .p-dropdown-items-wrapper > ul {
  padding: 0px !important;
  background-color: #f5f8fd;
}
</style>
