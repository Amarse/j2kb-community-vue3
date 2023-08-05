<template>
  <TemplatePostForm
    mode="write"
    :post="post"
    @category="setCategory"
    @back="back"
    @write="write"
  />
</template>
<script lang="ts" setup>
import { ref, onBeforeUnmount } from "vue";
import { TPost } from "@/assets/models/TPost";
import router from "@/router";
import FirebaseDatabase from "@/services/FirebaseDatabase";
import TemplatePostForm from "@/templates/TemplatePostForm.vue";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useAuthStore } from "@/stores/authStore.ts";
import { computed } from "vue";

dayjs.extend(utc);
const database = ref<FirebaseDatabase | null>(null);
const authStore = useAuthStore();

// variables
const post = ref<TPost>({
  post_id: "",
  nickname: "",
  email: "",
  content: "",
  views: 0,
  likes: 0,
  reply_ids: [],
  created_at: "",
  category: "",
  categoryKorean: "",
});

onBeforeUnmount(() => {
  database.value = null;
});

const email = computed(() => {
  return authStore.getUser.email !== null ? authStore.getUser.email : "";
});

const nickname = computed(() => {
  return authStore.getUser.nickname !== null ? authStore.getUser.nickname : "";
});

// methods
const init = () => {
  database.value = new FirebaseDatabase();
};

const back = () => {
  router.back();
};

const setCategory = (category: any) => {
  post.value.category = category.code;
  post.value.categoryKorean = category.name;
};

const write = async () => {
  if (database.value != null) {
    const refs = `posts`;
    const post_key = database.value.push(refs).key;

    if (post_key != null) {
      const data: TPost = {
        post_id: post_key,
        category: post.value.category,
        categoryKorean: post.value.categoryKorean,
        nickname: nickname.value, // temp
        email: email.value, // temp
        content: post.value.content,
        views: 0,
        likes: 0,
        reply_ids: [],
        created_at: dayjs().format().toString(),
      };

      const updates: any = {};
      updates["/posts/" + post_key] = data;

      await database.value.update(updates);

      router.push("/main");
    }
  }
};

init();
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
