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
        :class="inputValid.email"
      />
    </div>
    <div class="flex flex-column gap-2">
      <label for="nickname">Nickname</label>
      <InputText
        v-model="user.nickname"
        id="nickname"
        type="text"
        placeholder="별명을 입력해주세요"
        :class="inputValid.nickname"
      />
    </div>
    <div class="flex flex-column gap-2">
      <label for="password">Password</label>
      <InputText
        v-model="user.password"
        id="password"
        type="password"
        placeholder="비밀번호를 입력해주세요"
        :class="inputValid.password"
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
import { ref, onBeforeUnmount, onBeforeMount } from "vue";
import TemplateLoginForm from "@/templates/TemplateLoginForm.vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import router from "@/router";
import UserAuth from "@/services/UserAuth";
import FirebaseDatabase from "@/services/FirebaseDatabase";
import { Base64 } from "js-base64";
import validate from "@/utils/validate";
import { TValidateResponse } from "@/assets/models/TValidate";

// variables
const user = ref<TUser>({
  email: "",
  password: "",
  nickname: "",
});

const inputValid = ref({
  email: "",
  password: "",
  nickname: "",
});

const auth = ref<UserAuth | null>(null);
const database = ref<FirebaseDatabase | null>(null);

// lifecycle
onBeforeMount(() => {
  auth.value = new UserAuth();
  database.value = new FirebaseDatabase();
});

onBeforeUnmount(() => {
  auth.value = null;
  database.value = null;
});

// methods
const signup = async () => {
  // 1. 입력 여부 체크
  const inputResult = inputCheck();
  if (inputResult.status !== 200) {
    alert(inputResult.message);
    return;
  }

  // 2. 유효성 검사
  const validateResult = await validateCheck();
  if (validateResult.status !== 200) {
    alert(validateResult.message);
    return;
  }

  if (auth.value != null) {
    try {
      const result = await auth.value.signUp(
        user.value.email,
        user.value.password
      );
      // 데이터베이스에 유저 정보 저장
      const refs = `users/${result.user.uid}`;
      const data: TUser = {
        email: user.value.email,
        password: Base64.encode(user.value.password),
        nickname: user.value.nickname,
        post_ids: [],
        reply_ids: [],
      };

      if (database.value != null) {
        await database.value.write(refs, data);
        router.push("/login");
      }
    } catch (error) {
      alert(error);
    }
  }
};

const inputCheck = (): TValidateResponse => {
  // 이메일
  const isEmailInput = validate.inputCheck(user.value.email);
  if (!isEmailInput) {
    inputValid.value.email = "p-invalid";
    return { status: -1, message: "이메일을 입력해주세요." };
  }
  inputValid.value.email = "";

  // 닉네임
  const isNicknameInput = validate.inputCheck(user.value.nickname);
  if (!isNicknameInput) {
    inputValid.value.nickname = "p-invalid";
    return { status: -1, message: "별명을 입력해주세요." };
  }
  inputValid.value.nickname = "";

  // 비밀번호
  const isPasswordInput = validate.inputCheck(user.value.password);
  if (!isPasswordInput) {
    inputValid.value.password = "p-invalid";
    return { status: -1, message: "비밀번호를 입력해주세요." };
  }
  inputValid.value.password = "";

  return { status: 200, message: "" };
};

const validateCheck = async (): Promise<TValidateResponse> => {
  // 이메일
  const isEmailValid = validate.emailValidCheck(user.value.email);
  if (!isEmailValid) {
    inputValid.value.email = "p-invalid";
    return { status: -1, message: "이메일 형식 맞춰 입력해주세요." };
  }
  inputValid.value.email = "";

  // 닉네임 중복체크
  const snapshot = await database.value?.getSnapshotChild("users", "nickname");
  try {
    snapshot?.forEach((child) => {
      if (child.val().nickname === user.value.nickname) {
        throw new Error("nickname exist");
      }
    });
  } catch (error: any) {
    if (error.message == "nickname exist") {
      inputValid.value.nickname = "p-invalid";
      return { status: -1, message: "이미 사용 중인 별명 입니다." };
    }
  }
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

const cancel = () => {
  router.push("/login");
};
</script>
<style lang="scss" scoped></style>
