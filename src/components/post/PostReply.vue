<template>
  <div :class="['reply-wrapper', hasDepth]">
    <div class="flex gap-2 ">
      <p class="pr-2">
        <img
          class="reply-image border-circle mr-2"
          src="https://plus.unsplash.com/premium_photo-1666264200739-caa822df28d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60"
        />
      </p>
      <div class="flex flex-column  gap-2">
        <p class="flex align-items-center justify-content-center">
          <span class="text-base font-medium font-gray-900 mr-2">{{
            reply.nickname
          }}</span>
          <span class="text-sm font-gray-800">{{ reply.created_at }}</span>
        </p>
        <p class="content">
          {{ reply.content }}
        </p>
      </div>
    </div>
    <PostOptions @option="selectedCommentOption" class="option" />
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { TPostReply } from '@/assets/models/TPost';
import PostOptions from './PostOptions.vue';

const props = defineProps<{
  reply: TPostReply;
}>();

const hasDepth = computed(() => {
  return props.reply.depth === 0 ? 'original' : 'depth';
});
// methods
const selectedCommentOption = (option: string) => {
  if (option === 'modify') {
    // 수정
    // todo something
  } else {
    // 삭제
    // todo something
  }
};
</script>
<style lang="scss" scoped>
.reply-wrapper {
  position: relative;
  display: flex;
  padding: rem(32px);
  background-color: white;
  border-bottom: rem(1px) solid $gray100;
  .content {
    white-space: pre-wrap;
    font-size: rem(18px);
    line-height: rem(22px);
    color: $black;
  }
  .option {
    position: absolute;
    top: rem(32px);
    right: rem(16px);
  }
}

.depth {
  background-color: #f9f7f3 !important;
  padding-left: rem(100px) !important;
}
</style>
