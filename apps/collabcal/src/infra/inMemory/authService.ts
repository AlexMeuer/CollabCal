import {
  AuthService as AuthServiceInterface,
  AuthSession,
} from "~/services/authService";

export class AuthService implements AuthServiceInterface {
  constructor(session?: AuthSession) {
    this.session = session ?? null;
  }

  private session: AuthSession | null;

  loginWithEmail(email: string, _pw: string): Promise<AuthSession> {
    this.session = {
      id: email,
      name: "Lorem Ipsum",
    };
    return Promise.resolve(this.session);
  }

  async loginWithGoogle(): Promise<AuthSession> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    this.session = {
      id: "fake-google-id",
      name: "Lorem Ipsum",
    };
    return this.session;
  }

  logout(): Promise<void> {
    this.session = null;
    return Promise.resolve();
  }

  getSession(): Promise<AuthSession | null> {
    return Promise.resolve(this.session);
  }
}
