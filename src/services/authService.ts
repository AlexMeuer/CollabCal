export interface AuthSession {
  id: string;
}

export abstract class AuthService {
  abstract loginWithEmail(
    email: string,
    password: string
  ): Promise<AuthSession>;
  abstract loginWithGoogle(): Promise<AuthSession>;
  abstract logout(): Promise<void>;
  abstract getSession(): Promise<AuthSession | null>;
}
