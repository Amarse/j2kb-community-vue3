<template>
  <div class="post-view-wrapper">
    <header class="flex justify-content-between align-items-center text-5xl">
      <button aria-label="close" @click="back">
        <i class="pi pi-times" />
      </button>

      <p>글쓰기</p>
      <button aria-label="write" @click="write">
        <i class="pi pi-send" />
      </button>
    </header>
    <main ref="main">
      <Editor
        v-model="post.content"
        :editorStyle="`height: ${editorHeight}px`"
      />
    </main>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { TPost } from "@/assets/models/TPost";
import Editor from "primevue/editor";
import router from "@/router";

// variables
const post: TPost = {
  post_id: "",
  writer: "",
  content: "",
  views:0,
  likes: 0,
  reply_ids: [],
  created_at: "string",
};

const main = ref<any | null>(null);
const editorHeight = ref<number>(0);

onMounted(() => {
  // 41 means editor toolbar height
  editorHeight.value = main.value.clientHeight - 41;
});

// methods
const back = () => {
  router.back();
};

const write = () => {
  // todo something
  // implements to save post info
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

main {
  height: calc(100% - rem($header-height));

  :deep(.p-editor-container) {
    .p-editor-toolbar,
    .p-editor-content {
      border-radius: 0;
      border: none;
    }

    .p-editor-toolbar {
      border-top: rem(1px) solid $gray200;
      border-bottom: rem(1px) solid $gray200;
    }
  }

  :deep(.p-editor-container > .p-editor-content > .ql-editor) {
    border-radius: 0;
    border: none;
    border-bottom: rem(1px) solid $gray200;
  }
}
</style>
