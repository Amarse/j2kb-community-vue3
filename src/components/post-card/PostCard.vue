<template>
  <article class="board-card-wrapper">
    <div class="flex mb-4 gap-3 align-items-center">
      <img
        class="profile-image border-circle"
        src="https://plus.unsplash.com/premium_photo-1666264200739-caa822df28d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60"
      />
      <p class="flex align-items-center gap-2 line-height-2 font-gray-900">
        <span class="text-2xl">{{ post.writer }}</span>
        <span class="text-base">{{ date }}</span>
      </p>
    </div>
    <p class="mb-3 content text-lg font-black">
      {{ post.content }}
    </p>
    <p class="flex gap-7 align-items-center font-gray-900">
      <span class="text-base">
        <i class="pi pi-comment"></i>
        {{ post.reply_ids.length }}
      </span>
      <span class="text-base">
        <i class="pi pi-heart"></i>
        {{ post.likes }}
      </span>
    </p>
  </article>
</template>
<script lang="ts" setup>
import { TPost } from "@/assets/models/TPost";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const props = defineProps<{
  post: TPost;
}>();

const date = dayjs(props.post.created_at).fromNow();
</script>
<style lang="scss" scoped>
.board-card-wrapper {
  padding: rem(40px);

  .profile-image {
    width: rem(60px);
    height: rem(60px);
    object-fit: cover;
  }

  .title {
    @include text-truncate(1, 1.5);
  }
  .content {
    @include text-truncate(3, 1.5);
  }

  &:nth-child(2n) {
    border-top: rem(1px) solid #aaa;
    border-bottom: rem(1px) solid #aaa;
  }
}
</style>
