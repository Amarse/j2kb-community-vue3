<template>
  <article
    class="board-card-wrapper"
    @click.prevent="goToDetailView(post.post_id)"
  >
    <div class="flex gap-3 align-items-top">
      <p class="pr-2">
        <img
          class="profile-image border-circle"
          src="https://plus.unsplash.com/premium_photo-1666264200739-caa822df28d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60"
        />
      </p>
      <div class="flex flex-column gap-2">
        <div class="grid gap-2 line-height-3 font-gray-900">
          <p class="flex flex-column col-fixed" style="width: 82px">
            <span
              :class="[post.category == 'question' ? 'green' : 'orange']"
              class="text-sm"
              >{{ post.categoryKorean }}</span
            >
            <span class="text-xl font-medium">{{ post.nickname }}</span>
          </p>
          <span class="text-base pt-5">{{ date }}</span>
        </div>
        <p class="mb-3 content text-lg font-black" v-html="post.content">
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
  </article>
</template>
<script lang="ts" setup>
import { TPost } from '@/assets/models/TPost';
import router from '@/router';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { computed } from 'vue';

dayjs.extend(relativeTime);

const props = defineProps<{
  post: TPost;
}>();

// variables
const date = dayjs(props.post.created_at).fromNow();

const likes = computed(() => {
  return props.post.likes.length;
})
// methods
const goToDetailView = (id: string) => {
  router.push(`/detail/${id}`);
};
</script>
<style lang="scss" scoped>
.board-card-wrapper {
  padding: rem($card-padding);
  border-bottom: rem(1px) solid $gray500;
  .title {
    @include text-truncate(1, 1.5);
  }
  .content {
    @include text-truncate(3, 1.5);
  }
  :deep(.pi) {
    vertical-align: bottom;
  }
}
</style>
