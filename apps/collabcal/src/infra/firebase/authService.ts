import { AuthService as AuthServiceInterface, AuthSession } from "~/services/authService";
import {
  Auth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential
} from "firebase/auth";


export class AuthService implements AuthServiceInterface {
  constructor(private readonly auth: Auth) { }

  async loginWithEmail(email: string, password: string) {
    const cred = await signInWithEmailAndPassword(this.auth, email, password);
    return toDomain(cred.user);
  }
  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      login_hint: "user@example.com",
    });
    const cred = await signInWithPopup(this.auth, provider);
    return toDomain(cred.user);
  }
  logout() {
    return this.auth.signOut();
  }
  getSession() {
    const current = this.auth.currentUser;
    return Promise.resolve(current ? toDomain(current) : null);
  }
}

const toDomain = (user: UserCredential["user"]): AuthSession => ({
  id: user.uid,
  name: user.displayName ?? undefined,
  avatarURL: user.photoURL ?? undefined,
});
