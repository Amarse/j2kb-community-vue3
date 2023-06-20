<template>
  <TemplateLoginForm>
    <p class="text-center m-4">J2KB 대나무숲에 오신 것을 환영합니다!</p>
    <div class="flex flex-column gap-2">
      <label for="email">Email</label>
      <InputText
        v-model="user.email"
        id="email"
        type="text"
        placeholder="이메일을 입력해주세요"
      />
    </div>
    <div class="flex flex-column gap-2">
      <label for="nickname">Nickname</label>
      <InputText
        v-model="user.nickname"
        id="nickname"
        type="text"
        placeholder="닉네임을 입력해주세요"
      />
    </div>
    <div class="flex flex-column gap-2">
      <label for="password">Password</label>
      <InputText
        v-model="user.password"
        id="password"
        type="password"
        placeholder="비밀번호를 입력해주세요"
      />
    </div>
    <div class="flex gap-2">
      <Button label="회원가입" class="w-full" size="small" @click="signup" />
      <Button
        label="취소"
        class="w-full"
        size="small"
        severity="secondary"
        @click="cancel"
      />
    </div>
  </TemplateLoginForm>
</template>
<script lang="ts" setup>
import { TUser } from "@/assets/models/TUser";
import { ref } from "vue";
import TemplateLoginForm from "@/templates/TemplateLoginForm.vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import router from "@/router";
import { onBeforeMount } from "vue";
import UserAuth from "@/services/UserAuth";
import FirebaseDatabase from "@/services/FirebaseDatabase";
import { Base64 } from 'js-base64';

const user = ref<TUser>({
  email: "",
  password: "",
  nickname: "",
});

const auth = ref<UserAuth | null>(null);
const database = ref<FirebaseDatabase | null>(null);

const signup = async () => {
  if (auth.value != null) {
    try {
      const result = await auth.value.signUp(
        user.value.email,
        user.value.password
      );
      // save to user info
      const refs = `users/${result.user.uid}`;
      const data: TUser = {
        email: user.value.email,
        password: Base64.encode(user.value.password),
        nickname: user.value.nickname,
        post_ids: [],
        reply_ids: [],
      };

      await database.value?.write(refs, data);

      router.push("/login");
    } catch (error) {
      alert(error);
    }
  }
};

onBeforeMount(() => {
  auth.value = new UserAuth();
  database.value = new FirebaseDatabase();
});

const cancel = () => {
  router.push("/login");
};
</script>
<style lang="scss" scoped></style>
