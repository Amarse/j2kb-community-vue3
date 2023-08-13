<template>
  <div class="flex gap-3 align-items-top list-padding" @click="view">
    <p class="pr-2">
      <img
        class="profile-image border-circle"
        src="https://plus.unsplash.com/premium_photo-1666264200739-caa822df28d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60"
      />
    </p>
    <div class="flex flex-column gap-2">
      <div class="grid gap-2 line-height-3 font-gray-900">
        <p class="flex flex-column col-fixed" style="width:82px">
          <span :class="[post.category == '개발 질문' ? 'green' : 'orange']" class="text-sm">{{
            post.category
          }}</span>
          <span class="text-xl font-medium">{{ post.nickname }}</span>
        </p>
        <span class="text-base pt-5">{{ post.created_at }}</span>
      </div>
      <p class="mb-3 content text-lg font-black text-truncate">
        {{ post.content }}
      </p>
      <p class="flex gap-5 align-items-center font-gray-900">
        <span class="text-base">
          <i class="pi pi-comment"></i>
          {{ post.reply_ids.length }}
        </span>
        <span class="text-base">
          <i class="pi pi-heart"></i>
          {{ likes }}
        </span>
      </p>
    </div>
  </div>
  <hr class="w-11" />
</template>
<script lang="ts" setup>
import { TPost } from '@/assets/models/TPost';
import { computed } from 'vue';

const props = defineProps<{
  post: TPost;
}>();

const emit = defineEmits<{
  (e: 'view', id: string): void;
}>();

const likes = computed(() => {
  return props.post.likes.length;
})
// methods
const view = () => {
  emit('view', props.post.post_id);
};
</script>
<style lang="scss" scoped>
.list-padding {
  padding: rem(28px) rem(40px);
}
.text-truncate {
  @include text-truncate(1, 1.5);
}
:deep(.pi) {
  vertical-align: bottom;
}
</style>
