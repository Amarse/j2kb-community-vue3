<template>
  <TemplateLoginForm>
    <p class="flex justify-content-center align-items-center gap-2 m-3">
      <span>아직 회원이 아니신가요?</span>
      <Button
        label="회원가입"
        severity="secondary"
        text
        class="p-0 h-2rem"
        @click="goToSignUpView"
      />
    </p>
    <div class="flex flex-column gap-2">
      <label for="email">Email</label>
      <InputText
        v-model="user.email"
        id="email"
        type="text"
        :class="inputValid.email"
        placeholder="이메일을 입력해주세요"
      />
    </div>
    <div class="flex flex-column gap-2">
      <label for="password">Password</label>
      <InputText
        v-model="user.password"
        id="password"
        type="password"
        :class="inputValid.password"
        placeholder="비밀번호를 입력해주세요"
      />
    </div>
    <div class="flex justify-content-between align-items-center">
      <p class="flex gap-2 align-items-center">
        <Checkbox v-model="rememberEmail" inputId="chkemail" binary />
        <label for="chkemail">이메일 저장</label>
      </p>
      <p class="flex align-items-center">
        <Button
          label="비밀번호 찾기"
          severity="secondary"
          text
          class="p-0 h-2rem"
          @click="goToFindPasswordView"
        />
      </p>
    </div>
    <Button label="로그인" class="w-full" size="small" @click="login" />
  </TemplateLoginForm>
</template>

<script lang="ts" setup>
import { ref, onBeforeUnmount } from "vue";
import { TUser } from "@/assets/models/TUser";
import { TValidateResponse } from "@/assets/models/TValidate";
import { Base64 } from 'js-base64';
import TemplateLoginForm from "@/templates/TemplateLoginForm.vue";
import router from "@/router";
import UserAuth from "@/services/UserAuth";
import validate from "@/utils/validate";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Checkbox from "primevue/checkbox";

// import { useAuthStore } from '@/store/authStore';

const auth = ref<UserAuth | null>(null);

const user = ref<Pick<TUser, "email" | "password">>({
  email: "",
  password: "",
});

const inputValid = ref({
  email: "",
  password: "",
});

const rememberEmail = ref<boolean>(false);

onBeforeUnmount(() => {
  auth.value = null;
});

// methods
const init = () => {
  auth.value = new UserAuth();
};

const login = async (): Promise<void> => {
  // todo something
  // 1. validation check
  const validateResult = await validateCheck();
  if (validateResult.status !== 200) {
    alert(validateResult.message);
    return;
  }
  // 2. login -> move to board view
  const encodePassword = Base64.encode(user.value.password);
  await auth.value
    ?.login(user.value.email, encodePassword)
    .then(() => {
      router.push("/main");
    })
    .catch(() => {
      alert("가입된 이메일이 아닙니다.");
      router.push("sign-up");
    });
  // pinia 코드 인데 아직 테스트 중 (스토어로 만들어서 뺀 코드)
  // await useAuthStore().login(user.value.email, user.value.password);
  // if (!useAuthStore().error) {
  //   router.push('/main');
  //   // Login successful, navigate to another page or perform other actions
  // }
  // 3. 가입되지 않았다면??
};

const validateCheck = async (): Promise<TValidateResponse> => {
  // 이메일
  const isEmailValid = validate.emailValidCheck(user.value.email);
  if (!isEmailValid) {
    inputValid.value.email = "p-invalid";
    return { status: -1, message: "이메일 형식 맞춰 입력해주세요." };
  }
  inputValid.value.email = "";

  // 비밀번호
  const isPasswordValid = validate.passwordValidCheck(user.value.password);
  if (!isPasswordValid) {
    inputValid.value.password = "p-invalid";
    return {
      status: -1,
      message: "6자 ~ 24자 이내, 영대소문자 + 숫자 + 특수문자를 포함해주세요.",
    };
  }
  inputValid.value.password = "";

  return { status: 200, message: "" };
};

const goToSignUpView = () => {
  // todo something
  router.push("/sign-up");
};

const goToFindPasswordView = () => {
  // todo something
};

init();
</script>

<style lang="scss" scoped></style>
