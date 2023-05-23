<template>
  <article class="board-card-wrapper">
    <div class="flex mb-4 gap-3">
      <img
        class="profile-image border-circle"
        src="https://plus.unsplash.com/premium_photo-1666264200739-caa822df28d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60"
      />
      <p class="flex flex-column line-height-2 font-gray-900">
        <span class="text-4xl">{{ props.name }}</span>
        <span class="text-lg">{{ date }}</span>
      </p>
    </div>
    <p class="mb-3 title text-2xl font-bold font-black">
      {{ props.title }}
    </p>
    <p class="mb-3 content text-lg font-black">
      {{ props.content }}
    </p>
    <p class="flex gap-2 align-items-center font-gray-900">
      <i class="pi pi-comment text-2xl"></i>
      <span class="text-2xl">{{ props.commentCount }}</span>
    </p>
  </article>
</template>
<script lang="ts" setup>
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const props = defineProps<{
  name: string;
  date: string;
  title: string;
  content: string;
  commentCount: number;
}>();

const date = dayjs(props.date).fromNow()
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
