<template>
  <article class="profile-card-wrapper">
    <div
      class="flex justify-content-between align-items-center line-height-3 font-gray-900 w-full"
      @click="view"
    >
      <div class="flex align-items-center w-10">
        <p class="text-lg font-black text-truncate w-8">
          {{ content.content }}
        </p>
        <span
          :class="[
            content.kind === '댓글' ? 'baby-pink-badge' : 'purple-badge',
          ]"
          class="ml-2"
          >{{ content.kind }}</span
        >
      </div>
      <span class="text-sm font-gray-800">{{ content.created_at }}</span>
    </div>
  </article>
</template>
<script lang="ts" setup>
import { MyContent } from "@/assets/models/TPost";

const props = defineProps<{
  content: MyContent;
}>();

const view = () => {
  emit("view", props.content.post_id);
};
const emit = defineEmits<{
  (e: "view", id: string): void;
}>();
</script>
<style lang="scss" scoped>
.profile-card-wrapper {
  padding: rem(24px) 0;
  border-bottom: rem(1px) solid #aaa;
  
  .text-truncate {
    @include text-truncate(1, 1.5);
  }
}
</style>
