import { getAuth, createUserWithEmailAndPassword, Auth, signInWithEmailAndPassword, UserCredential } from "firebase/auth";
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
}