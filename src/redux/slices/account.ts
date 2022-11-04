import {
  createAsyncThunk,
  createSlice,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import { Models } from "appwrite";
import { account } from "~/infra/appwrite";

export interface LoginPayload {
  email: string;
  password: string;
}
export const loginWithEmail = createAsyncThunk(
  "account/login/email",
  async (payload: LoginPayload) => {
    const session = await account.createEmailSession(
      payload.email,
      payload.password
    );
    return session;
  }
);
export const fetchSession = createAsyncThunk("account/fetch", async () => {
  const result = await account.listSessions();
  return result.total ? result.sessions[0] : null;
});
export const logout = createAsyncThunk("account/logout", () =>
  account.deleteSessions()
);

export interface AccountState {
  session: Models.Session | null;
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
