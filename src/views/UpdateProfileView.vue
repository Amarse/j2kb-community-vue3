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
    <MyContentsCard
      v-for="(content, index) in contentList"
      :content="content"
      :key="index"
      @view="moveToPostDetailView"
    />
    <span class="withdrawal font-gray-600" @click="withdrawal">회원탈퇴</span>
  </section>
</template>
<script lang="ts" setup>
import { MyContent } from "@/assets/models/TPost";
import router from "@/router";
import MyContentsCard from "@/components/my-contents/MyContentsCard.vue";
import UserAuth from "@/services/UserAuth";
import { onBeforeMount, onBeforeUnmount, ref } from "vue";

// 로그인 한 유저의 post_ids, reply_ids 검색을 해서
// 컨텐츠 리스트를 만든다.
const auth = ref<UserAuth | null>(null);
const contentList: MyContent[] = [
  {
    post_id: "test2",
    content_id: "test2",
    kind: "댓글",
    content: `대나무 숲을 만들어보자.대나무 숲을 만들어보자.대나무 숲을
      만들어보자.대나무 숲을 만들어보자.대나무 숲을 만들어보자.대나무 숲을
      만들어보자.대나무 숲을 만들어보자.대나무 숲을 만들어보자.대나무 숲을
      만들어보자.대나무 숲을 만들어보자.대나무 숲을 만들어보자.대나무 숲을
      만들어보자.대나무 숲을 만들어보자.대나무 숲을 만들어보자.대나무 숲을
      만들어보자.대나무 숲을 만들어보자.대나무 숲을 만들어보자.`,
    created_at: "2023-05-22 13:18",
  },
  {
    post_id: "test2",
    content_id: "test2",
    kind: "게시글",
    content: `대나무 숲을 만들어보자.대나무 숲을 만들어보자.대나무 숲을
      만들어보자.대나무 숲을 만들어보자.대나무 숲을 만들어보자.대나무 숲을
      만들어보자.대나무 숲을 만들어보자.대나무 숲을 만들어보자.대나무 숲을
      만들어보자.대나무 숲을 만들어보자.대나무 숲을 만들어보자.대나무 숲을
      만들어보자.대나무 숲을 만들어보자.대나무 숲을 만들어보자.대나무 숲을
      만들어보자.대나무 숲을 만들어보자.대나무 숲을 만들어보자.`,
    created_at: "2023-05-22 13:18",
  },
];

// lifecycle
onBeforeMount(() => {
  auth.value = new UserAuth();
});

onBeforeUnmount(() => {
  auth.value = null;
});

const moveToPostDetailView = (id: string) => {
  router.push(`/detail/${id}`);
};

const withdrawal = async () => {
  if (auth.value != null) {
    try {
      await auth.value.withdrawal();
      alert("회원 탈퇴가 완료되었습니다.");

      // todo something
      // 회원 탈퇴 완료 시 로그인 화면으로 이동
      // router.push("/login");
    } catch (error) {
      alert("회원 탈퇴 실패하였습니다.");
    }
  }
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
