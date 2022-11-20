import {
  createSlice,
  isRejected,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";
import { UserData } from "shared-types/userData";
import { AuthSession } from "~/services/authService";
import { createAsyncAppThunk } from "../ioc";

export const fetchUserData = createAsyncAppThunk(
  "userData/fetchOne",
  (id: string, { extra }) => extra.repos.userData.read(id)
);

export interface UserDataState {
  users: Record<AuthSession["id"], UserData>;
  status: "idle" | "loading" | "failed";
  error?: SerializedError;
}

export const userDataSlice = createSlice({
  name: "userData",
  initialState: {
    users: {},
    status: "idle",
    error: undefined,
  } as UserDataState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.users[action.payload.id] = action.payload;
      state.status = "idle";
    });

    builder.addMatcher(
      isRejected,
      (
        state,
        action: PayloadAction<unknown, string, unknown, SerializedError>
      ) => {
        state.status = "failed";
        state.error = action.error;
      }
    );
  },
});
