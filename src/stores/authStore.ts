import router from "@/router";
import FirebaseUserAuth from "@/services/FirebaseUserAuth";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

type TUser = {
  uid: string;
  accessToken: string;
  email: string | null;
  nickname: string | null;
};
export const useAuthStore = defineStore("auth", () => {
  const userAuth = new FirebaseUserAuth();
  const user = ref<TUser>({
    uid: "",
    accessToken: "",
    email: "",
    nickname: "",
  });

  const savedUser = localStorage.getItem("user");
  if (savedUser != null) {
    user.value = JSON.parse(savedUser);
  }

  const login = async (_email: string, _password: string) => {
    await userAuth
      .login(_email, _password)
      .then((res) => {
        user.value.uid = res.user.uid;
        user.value.email = res.user.email;
        user.value.accessToken = res.user.accessToken;
        user.value.nickname = res.user.displayName;
        
        localStorage.setItem("user", JSON.stringify(user.value));

        router.push("main");
      })
      .catch(() => {
        alert("가입된 이메일이 아닙니다.");
        router.push("sign-up");
      });
  };

  const getUser = computed(() => user.value);

  return { login, getUser };
});
