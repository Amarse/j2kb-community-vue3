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
import { ref, onBeforeUnmount, onBeforeMount } from "vue";
import TemplatePostForm from "@/templates/TemplatePostForm.vue";
import { TPost } from "@/assets/models/TPost";
import router from "@/router";
import FirebaseDatabase from "@/services/FirebaseDatabase";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

// variables
const post = ref<TPost>({
  post_id: "",
  writer: "",
  content: "",
  views: 0,
  likes: 0,
  reply_ids: [],
  created_at: "",
  category: "",
});

const database = ref<FirebaseDatabase | null>(null);

// lifecycle
onBeforeMount(() => {
  database.value = new FirebaseDatabase();
});

onBeforeUnmount(() => {
  database.value = null;
});

// methods
const back = () => {
  router.back();
};

const setCategory = (category: any) => {
  post.value.category = category.code;
}

const write = async () => {
  if (database.value != null) {
    const refs = `posts`;
    const post_key = database.value.push(refs).key;

    if (post_key != null) {
      const data: TPost = {
        post_id: post_key,
        category: post.value.category,
        writer: "박소담", // temp
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
