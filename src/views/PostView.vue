<template>
  <div class="post-view-wrapper">
    <header class="flex justify-content-between align-items-center">
      <button aria-label="close" @click="back">
        <i class="pi pi-times" />
      </button>

      <p class="text-3xl font-black">글쓰기</p>
      <button aria-label="write" @click="write">
        <i class="pi pi-send" />
      </button>
    </header>
    <main ref="main">
      <Editor v-model="post.content" :editorStyle="`height: ${editorHeight}px`">
        <template v-slot:toolbar>
          <span class="ql-formats">
            <button v-tooltip.bottom="'Bold'" class="ql-bold"></button>
            <button v-tooltip.bottom="'Italic'" class="ql-italic"></button>
            <button
              v-tooltip.bottom="'Underline'"
              class="ql-underline"
            ></button>
            <select class="ql-background">
              <option value="red"></option>
              <option value="orange"></option>
              <option value="yellow"></option>
              <option value="green"></option>
              <option value="blue"></option>
              <option value="purple"></option>
              <option value="white"></option>
              <option value="gray"></option>
              <option value="black"></option>
            </select>

            <select class="ql-color">
              <option value="red"></option>
              <option value="orange"></option>
              <option value="yellow"></option>
              <option value="green"></option>
              <option value="blue"></option>
              <option value="purple"></option>
              <option value="white"></option>
              <option value="gray"></option>
              <option value="black"></option>
            </select>
          </span>
        </template>
      </Editor>
    </main>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { TPost } from "@/assets/models/TPost";
import Editor from "primevue/editor";
import router from "@/router";

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

      strong {
        font-weight: bold !important;
      }

      em {
        font-style: italic;
      }
    }

    .p-editor-toolbar {
      border-top: rem(1px) solid $gray200;
      border-bottom: rem(1px) solid $gray200;

      &.ql-snow {
        .ql-picker.ql-expanded {
          .ql-picker-options {
            padding: 0.75rem !important;
            display: grid;
            gap: 0.25rem;
            grid-template-columns: 1fr 1fr 1fr;
            .ql-picker-item {
              width: 100% !important;
              height: 1.5rem !important;
              padding: 0 !important;
            }
          }
        }
      }
    }
  }

  :deep(.p-editor-container > .p-editor-content > .ql-editor) {
    border-radius: 0;
    border: none;
    border-bottom: rem(1px) solid $gray200;
  }
  :deep(.pi) {
    color: $gray600;
  }
}
</style>
