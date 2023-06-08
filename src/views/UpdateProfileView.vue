<template>
  <header>
    <p class="flex justify-content-between align-items-center black">
      <span class="text-3xl font-medium">프로필</span>
      <button aria-label="hamburger" class="hamburger-button">
        <i class="pi pi-bars" />
      </button>
    </p>
  </header>
  <section class="view-padding re">
    <article>
      <div class="flex align-items-center justify-content-between">
        <div class="flex align-items-center gap-2">
          <p class="pr-3">
            <img
              class="profile-image border-circle"
              src="https://plus.unsplash.com/premium_photo-1666264200739-caa822df28d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60"
            />
          </p>
          <span class="text-2xl font-medium">박소담</span>
          <i class="pi pi-pencil text-base" />
        </div>
        <span class="text-sm font-gray-600 mr-2">로그아웃</span>
      </div>
    </article>
    <article class="mb-2">
      <div class="my-contents flex align-items-center">
        <ul class="flex w-full justify-content-around align-items-center">
          <li>
            <span class="block mb-1 font-base font-gray-900">1</span>
            <span class="block font-base font-gray-900">내가 쓴 게시물</span>
          </li>
          <li>
            <span class="block mb-1 font-base font-gray-900">1</span>
            <span class="block font-base font-gray-900">내가 쓴 댓글</span>
          </li>
        </ul>
      </div>
    </article>
    <MyContents
      v-for="(content, index) in contents"
      :my-contents="content"
      :key="index"
      @view="moveToPostDetailView"
    />
    <span class="withdrawal font-gray-600">회원탈퇴</span>
  </section>
</template>
<script lang="ts" setup>
import router from '@/router';
import MyContents from '@/components/my-contens/ContentsCard.vue';

export type Mycontent = {
  id: string;
  content: string;
	post_id:string;
  created_at: string;
};

const contents: Mycontent[] = [
  {
    id: '댓글',
		post_id: 'test2',
    content: `대나무 숲을 만들어보자.대나무 숲을 만들어보자.대나무 숲을
      만들어보자.대나무 숲을 만들어보자.대나무 숲을 만들어보자.대나무 숲을
      만들어보자.대나무 숲을 만들어보자.대나무 숲을 만들어보자.대나무 숲을
      만들어보자.대나무 숲을 만들어보자.대나무 숲을 만들어보자.대나무 숲을
      만들어보자.대나무 숲을 만들어보자.대나무 숲을 만들어보자.대나무 숲을
      만들어보자.대나무 숲을 만들어보자.대나무 숲을 만들어보자.`,
    created_at: '2023-05-22 13:18',
  },
  {
    id: '게시글',
		post_id: 'test2',
    content: `대나무 숲을 만들어보자.대나무 숲을 만들어보자.대나무 숲을
      만들어보자.대나무 숲을 만들어보자.대나무 숲을 만들어보자.대나무 숲을
      만들어보자.대나무 숲을 만들어보자.대나무 숲을 만들어보자.대나무 숲을
      만들어보자.대나무 숲을 만들어보자.대나무 숲을 만들어보자.대나무 숲을
      만들어보자.대나무 숲을 만들어보자.대나무 숲을 만들어보자.대나무 숲을
      만들어보자.대나무 숲을 만들어보자.대나무 숲을 만들어보자.`,
    created_at: '2023-05-22 13:18',
  },
];

const moveToPostDetailView = (id: string) => {
  router.push(`/detail/${id}`);
};

</script>
<style lang="scss" scoped>
.view-padding {
  padding: rem(28px) rem(40px);

  .my-contents {
    width: 100%;
    height: rem(70px);
    background-color: $lemon;
    padding: rem(12px);
    border-radius: rem(20px);
    margin-top: rem(20px);
    text-align: center;
    box-sizing: border-box;
  }
  .withdrawal {
    position: absolute;
    bottom: rem(40px);
    right: rem(40px);
  }
}
</style>
