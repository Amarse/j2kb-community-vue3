import { getAuth, createUserWithEmailAndPassword, Auth, signInWithEmailAndPassword, UserCredential, deleteUser, updateProfile } from "firebase/auth";
import { firebaseApp } from "./firebase";

export default class UserAuth {
  private auth: Auth;
  constructor() {
    this.auth = getAuth(firebaseApp);
  }
  public signUp(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, email, password)
  }
  public login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }
  public withdrawal(): Promise<void> {
    const user = this.auth.currentUser;
    if(user !== null) {
      return deleteUser(user);
    }
    else {
      return Promise.reject('not withdrawal');
    }
  }
  public updateDisplayName(nickname: string): Promise<void> {
    const user = this.auth.currentUser;
    if(user !== null) {
      return updateProfile(user, {displayName: nickname});
    }
    else {
      return Promise.reject('not withdrawal');
    }
  }
}