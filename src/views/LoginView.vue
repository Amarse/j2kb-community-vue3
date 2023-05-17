<template>
  <TemplateLoginForm>
    <p class="flex justify-content-center align-items-center gap-2 m-3">
      <span>아직 회원이 아니신가요?</span>
      <Button label="회원가입" severity="secondary" text class="p-0 h-2rem" />
    </p>
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
      <label for="password">Password</label>
      <InputText
        v-model="user.password"
        id="password"
        type="password"
        placeholder="비밀번호를 입력해주세요"
      />
    </div>
    <div class="flex justify-content-between align-items-center">
      <p class="flex gap-2 align-items-center">
        <Checkbox v-model="rememberEmail" inputId="chkbox1" binary />
        <label for="chkbox1">이메일 저장</label>
      </p>
      <p class="flex align-items-center">
        <Button
          label="비밀번호 찾기"
          severity="secondary"
          text
          class="p-0 h-2rem"
        />
      </p>
    </div>
    <Button label="로그인" class="w-full" size="small" />
  </TemplateLoginForm>
</template>

<script lang="ts" setup>
import { TUser } from "@/assets/models/TUser";
import TemplateLoginForm from "@/templates/TemplateLoginForm.vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Checkbox from "primevue/checkbox";
import { ref } from "vue";

const user = ref<Pick<TUser, "email" | "password">>({
  email: "",
  password: "",
});

const rememberEmail = ref<boolean>(false);
</script>

<style lang="scss" scoped></style>
