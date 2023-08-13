<template>
  <div class="post-view-wrapper">
    <header class="flex justify-content-between align-items-center">
      <button aria-label="close" @click="back">
        <i class="pi pi-times" />
      </button>
      <p v-if="mode === 'write'" class="text-3xl font-black">글쓰기</p>
      <p v-else class="text-3xl font-black">수정하기</p>
      <button v-if="mode === 'write'" aria-label="write" @click="write">
        <i class="pi pi-send" />
      </button>
      <button v-else aria-label="write" @click="edit">
        <i class="pi pi-pencil" />
      </button>
    </header>
    <main ref="main">
      <Dropdown
        :modelValue="selectedCateogry"
        @update:modelValue="selectCategory"
        :options="categories"
        optionLabel="name"
        placeholder="카테고리를 선택해주세요."
        class="w-full border-none border-noround"
      />

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
import { TPost } from "@/assets/models/TPost";
import Editor from "primevue/editor";
import Dropdown from "primevue/dropdown";
import { ref, onMounted, watch } from "vue";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const props = defineProps<{
  mode: string;
  post: TPost;
}>();

const emit = defineEmits<{
  (e: "back"): void;
  (e: "write"): void;
  (e: "edit"): void;
}>();

const main = ref<any | null>(null);
const editorHeight = ref<number>(0);
const categories = ref([
  { name: "스터디/모임", code: "study" },
  { name: "개발 질문", code: "question" },
]);

const selectedCateogry = ref<any>({});

onMounted(() => {
  // 41 means editor toolbar height
  editorHeight.value = main.value.clientHeight - 41;
});

const selectCategory = (value: { name: string, code: string }) => {
  props.post.categoryKorean = value.name;
  props.post.category = value.code;
}

watch(
  () => props.post,
  (value) => {
    selectedCateogry.value = { name: value.categoryKorean, code: value.category }
  },
  { deep: true }
);

const back = () => {
  emit("back");
};

const write = () => {
  emit("write");
};

const edit = () => {
  emit("edit");
};
</script>
<style lang="scss" scoped>
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
