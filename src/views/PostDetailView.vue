<template>
  <div class="post-detail">
    <header class="flex mb-2">
      <button @click="back" class="back">
        <i class="pi pi-chevron-left" />
      </button>
      <span class="ml-3 font-gray-600 text-3xl font-medium">대나무숲</span>
    </header>
    <main class="main flex flex-column">
      <!-- post area -->
      <section class="relative bg-white wrapper detail-flex">
        <article>
          <div class="flex align-items-center mb-4">
            <p class="pr-2 mr-3">
              <img
                class="profile-image border-circle"
                src="https://plus.unsplash.com/premium_photo-1666264200739-caa822df28d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60"
              />
            </p>
            <p class="flex flex-column gap-2">
              <span class="text-xl font-medium">{{ post.nickname }}</span>
              <span class="text-sm font-gray-800"
                >{{ created_at }} 조회수 {{ post.views }}</span
              >
            </p>
          </div>
          <p class="line-height-3 content-space" v-html="post.content" />
          <PostOptions @option="selectedPostOption" class="option" />
        </article>
        <article>
          <p class="flex gap-5 align-items-center font-gray-900">
            <span class="text-base" @click="postLike">
              <i class="pi pi-heart"></i>
              {{ likes }}
            </span>
          </p>
        </article>
      </section>
    
      <!-- comment area -->
      <section class="reply-section">
        <p class="flex justify-content-between  align-items-center p-5 bg-white comment-list-header">
            <span class="text-xl">전체 댓글</span>
          <div class="flex align-items-center">
            <button @click="commentOrderBy('desc')" :class="orderBy === 'desc' ? 'selected' : ''" class="text-base">최신순</button>
            <Divider layout="vertical" class="custom-divider"/>
            <button @click="commentOrderBy('asc')" :class="orderBy === 'asc' ? 'selected' : ''" class="text-base">등록순</button>
          </div>
        </p>
        <div class="reply-scroll-wrapper">
          <PostReply
          v-for="(reply, index) in replyList"
          :reply="reply"
          :key="index"
        />
        </div>

        <div class="reply-input-box">
          <InputText v-model="reply.content" placeholder="댓글을 입력해주세요." class="w-11 border-noround"/>
          <button class="reply-button">등록</button>
        </div>
      </section>
    </main>
  </div>
</template>
<script lang="ts" setup>
import { TPost, TPostReply } from "@/assets/models/TPost";
import { computed, onBeforeUnmount, ref } from "vue";
import { useRoute } from "vue-router";
import router from "@/router";
import FirebaseDatabase from "@/services/FirebaseDatabase";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import PostOptions from "@/components/post/PostOptions.vue";
import PostReply from "@/components/post/PostReply.vue";
import Divider from "primevue/divider";
import InputText from "primevue/inputtext";
import { useAuthStore } from "@/stores/authStore.ts";

dayjs.extend(utc);

const authStore = useAuthStore();
const route = useRoute();
const post_id: string | undefined = route.params.id.toString();
const database = ref<FirebaseDatabase | null>(null);
const replyList = ref<TPostReply[]>([]);
const orderBy = ref<string>("desc");

const post = ref<TPost>({
  post_id: "",
  nickname: "",
  email: "",
  content: "",
  views: 0,
  likes: [],
  created_at: "",
  category: "",
  categoryKorean: "",
  reply_ids: [],
});

const reply = ref<TPostReply>({
  post_id: post.value.post_id,
  reply_id: "",
  nickname: "",
  content: "",
  depth: 0,
  bundle_id: 0,
  bundle_order: 0,
  created_at: "",
});

const isUpdating = ref<boolean>(false);

const created_at = computed(() => {
  if(post.value?.created_at === "") {
    return "";
  }
  return dayjs(post.value?.created_at).format("YYYY-MM-DD hh:mm:ss");
});

onBeforeUnmount(() => {
  database.value = null;
});

const likes = computed(() => {
  return post.value.likes.length;
})

// methods
const init = () => {
  database.value = new FirebaseDatabase();
  loadPost(post_id);
};

const back = () => {
  router.back();
};

const loadPost = async (id: string) => {
  const snapshot = await database.value?.queryEqualTo("posts", "post_id");
  try {
    snapshot?.forEach((child) => {
      if (child.val().post_id === id) {
        post.value = {
          post_id: child.val().post_id,
          category: child.val().category,
          categoryKorean: child.val().categoryKorean,
          nickname: child.val().nickname,
          email: child.val().email,
          content: child.val().content,
          views: child.val().views + 1,
          likes: child.val().likes === undefined ? [] :  child.val().likes,
          reply_ids: child.val().reply_ids === undefined ? [] :  child.val().reply_ids,
          created_at: dayjs(child.val().created_at).format().toString(),
        };
      }
    });

    post.value.reply_ids.forEach((id, index) => {
      replyList.value.push({
        post_id: post.value.post_id,
        reply_id: id,
        nickname: "김하나",
        content:
          "안녕하시렵니까?\n안녕하시렵니까?\n안녕하시렵니까?\n안녕하시렵니까?",
        depth: index >= 1 ? 1 : 0,
        bundle_id: 100,
        bundle_order: index >= 1 ? 1 : 0,
        created_at: "2023-05-22 13:18",
      });
    });
    
    // 조회수 증가
    const updates: any = {};
    updates["/posts/" + id] = post.value;
    await database.value?.update(updates);

  } catch (error: any) {
    console.error(error);
  }
};

const selectedPostOption = async (option: string) => {
  if (option === "modify") {
    // 수정
    router.push(`/post/edit/${post_id}`);
  } else {
    // 삭제
    if(confirm("게시글을 정말 삭제하시겠습니까?")) {
      const refs = `posts/${post_id}`;
      await database.value?.remove(refs)
      .then(() => {
        router.back();
      })
      .catch(error => {
        console.log(error);
      });
    }
  }
};

const commentOrderBy = (_orderBy: string) => {
  orderBy.value = _orderBy;
};

const postLike = async () => {
  if(isUpdating.value) return;
  
  isUpdating.value = true;
  if(post.value.likes.includes(authStore.getUser.uid)) {
    const index = post.value.likes.findIndex(el => el === authStore.getUser.uid);
    post.value.likes.splice(index, 1);
  }
  else {
    post.value.likes.push(authStore.getUser.uid);
  }

  const data: TPost = {
    post_id: post_id,
    category: post.value.category,
    categoryKorean: post.value.categoryKorean,
    nickname: post.value.nickname,
    email: post.value.email,
    content: post.value.content,
    views: post.value.views,
    likes: post.value.likes,
    reply_ids: post.value.reply_ids,
    created_at: post.value.created_at,
    updated_at: dayjs().format().toString(),
  };

  const updates: any = {};
  updates["/posts/" + post_id] = data;
  try {
    await database.value?.update(updates).then(() => {
      isUpdating.value = false;
    });
  }
  catch(error: any) {
    console.error(error);
    isUpdating.value = false;
  }
}

init();
</script>
<style lang="scss" scoped>

$reply-input-height: 45px;
.post-detail {
  background: #f9f7f3;

  .main {
    height: calc(100vh - (rem($header-height) + 0.5rem)); //mb-2
    .wrapper {
      width: 100%;
      min-height: rem(300px);
      height: rem(300px);
      padding: rem(30px) rem($card-padding);
      border: none;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .option {
        position: absolute;
        top: rem(40px);
        right: rem(16px);
      }

      .content-space {
        padding-left: rem(75px);
      }
    }

    .comment-list-header {
      margin-top: 0.5rem;
      border-bottom: rem(1px) solid $gray600;
    }

    .reply-section {
      height: calc(100% - (rem(300px + $reply-input-height) + 0.5rem)); //comment-list-header margin-top

      .reply-scroll-wrapper {
        height: calc(100% - rem(86.5px));
        overflow: auto;
      }
    }

    :deep(.p-divider.p-divider-vertical) {
      margin: rem(0px) rem(18px);
      padding: rem(0);
      min-height: rem(18px);
      height: rem(18px);
    }
  }

  .reply-input-box {
    display: flex;
    height: rem($reply-input-height);
    .reply-button {
      width: calc(100% - 91.6667%);
      height: 100%;
      background: $blue;
      color: white;
    }
  }
}

button {
  background: transparent;
  border: none;
}

.selected {
  color: $pink;
}


</style>
