import { AuthService as AuthServiceInterface } from "~/services/authService";
import {
  Auth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
export class AuthService implements AuthServiceInterface {
  constructor(private readonly auth: Auth) {}

  async loginWithEmail(email: string, password: string) {
    const cred = await signInWithEmailAndPassword(this.auth, email, password);
    return { id: cred.user.uid };
  }
  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      login_hint: "user@example.com",
    });
    const cred = await signInWithPopup(this.auth, provider);
    return { id: cred.user.uid };
  }
  logout() {
    return this.auth.signOut();
  }
  getSession() {
    const current = this.auth.currentUser;
    return Promise.resolve(current ? { id: current.uid } : null);
  }
}
