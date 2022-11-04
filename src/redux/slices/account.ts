import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { Models } from "appwrite";
import { AuthSession } from "~/services/authService";
import { createAsyncAppThunk } from "../ioc";

export interface LoginPayload {
  email: string;
  password: string;
}
export const loginWithEmail = createAsyncAppThunk(
  "account/login/email",
  async (payload: LoginPayload, { extra }) => {
    const session = await extra.services.auth.loginWithEmail(
      payload.email,
      payload.password
    );
    return session;
  }
);
export const loginWithGoogle = createAsyncAppThunk(
  "account/login/google",
  (_, { extra }) => extra.services.auth.loginWithGoogle()
);
export const fetchSession = createAsyncAppThunk(
  "account/fetch",
  async (_, { extra }) => {
    const session = await extra.services.auth.getSession();
    return session;
  }
);
export const logout = createAsyncAppThunk("account/logout", (_, { extra }) =>
  extra.services.auth.logout()
);

export interface AccountState {
  session: AuthSession | null;
  status: "idle" | "loading" | "failed";
}

export const accountSlice = createSlice({
  name: "account",
  initialState: {
    session: null,
    status: "idle",
  } as AccountState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loginWithEmail.fulfilled, (state, action) => ({
        ...state,
        status: "idle",
        session: action.payload,
      }))
      .addCase(fetchSession.fulfilled, (state, action) => ({
        ...state,
        status: "idle",
        session: action.payload,
      }))
      .addCase(logout.fulfilled, (state) => ({
        ...state,
        status: "idle",
        session: null,
      }));

    builder
      .addMatcher(isPending, (state) => {
        state.status = "loading";
      })
      .addMatcher(isRejected, (state) => {
        state.status = "failed";
      });
  },
});
