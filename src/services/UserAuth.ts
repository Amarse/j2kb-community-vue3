import { getAuth, createUserWithEmailAndPassword, Auth, UserCredential } from "firebase/auth";
import { firebaseApp } from "./firebase";

export default class UserAuth {
  private auth: Auth;
  constructor() {
    this.auth = getAuth(firebaseApp);
  }
  public signUp(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, email, password)
  }
}
