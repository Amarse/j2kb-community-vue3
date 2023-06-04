<template>
  <div class="flex gap-3 justify-content-between align-items-center list-padding" @click="view">
    <img
      class="profile-image border-circle"
      src="https://plus.unsplash.com/premium_photo-1666264200739-caa822df28d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60"
    />
    <p class="w-8">
      <span class="text-2xl font-gray-800">{{ post.writer }}</span>
      <span class="mt-1 text-truncate font-black">{{ post.content }}</span>
    </p>
    <span class="font-gray-800">{{ post.created_at }}</span>
  </div>
  <hr class="w-11">
</template>
<script lang="ts" setup>
import { TPost } from "@/assets/models/TPost";

const props = defineProps<{
  post: TPost;
}>();

const emit = defineEmits<{
    (e: "view", id: string): void;
}>();

// methods
const view = () => {
    emit("view", props.post.post_id);
}
</script>
<style lang="scss" scoped>
.list-padding {
    padding: rem(28px) rem(40px);
}
.text-truncate {
  @include text-truncate(1, 1.5);
}
</style>
