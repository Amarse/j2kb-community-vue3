import { defineStore } from 'pinia';
import { User, signInWithEmailAndPassword, getAuth } from 'firebase/auth';
// import { Base64 } from 'js-base64';
// import { TUser } from '@/assets/models/TUser';

interface AuthState {
  user: User | null;
  error: string | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    error: null,
  }),
  actions: {
    async login(email: string, password: string): Promise<void> {
      try {
        const auth = getAuth();
        // const passwordChanged64 = Base64.encode(password);
        const { user } = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log('user', user);
        this.user = user;
        this.error = null;
      } catch (error) {
        this.user = null;
        this.error = 'err';
      }
    },
  },
});
