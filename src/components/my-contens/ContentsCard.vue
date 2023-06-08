<template>
  <article class="profile-card-wrapper">
    <div class="flex justify-content-between align-items-center line-height-3 font-gray-900 w-full" @click="view">
      <div class="flex align-items-center w-8">
        <p class="content text-lg font-black text-truncate w-6">
          {{ myContents.content }}
        </p>
        <span :class="[myContents.id === '댓글' ? 'baby-pink-badge' : 'purple-badge']" class="ml-2">{{ myContents.id }}</span>
      </div>
      <span class="text-sm font-gray-800">{{ myContents.created_at }}</span>
    </div>
  </article>
</template>
<script lang="ts" setup>
// import router from '@/router';
import { Mycontent } from '@/views/UpdateProfileView.vue';
// import dayjs from 'dayjs';
// import relativeTime from 'dayjs/plugin/relativeTime';

// dayjs.extend(relativeTime);

const props = defineProps<{
  myContents: Mycontent;
}>();

const view = () => {
  emit('view', props.myContents.id);
};
const emit = defineEmits<{
  (e: 'view', id: string): void;
}>();

// variables
// const date = dayjs(props.myContents.created_at).fromNow();

// methods
// const goToDetailView = (id: string) => {
//   router.push(`/detail/${id}`);
// };
</script>
<style lang="scss" scoped>
.profile-card-wrapper {
  padding: rem(24px) 0;
  border-bottom: rem(1px) solid #aaa;
  .title {
    @include text-truncate(1, 1.5);
  }
  .content {
    @include text-truncate(3, 1.5);
  }
  .text-truncate {
    @include text-truncate(1, 1.5);
  }
}
</style>
