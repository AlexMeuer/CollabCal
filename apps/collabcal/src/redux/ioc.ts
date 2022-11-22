import {
  AsyncThunk,
  AsyncThunkOptions,
  AsyncThunkPayloadCreator,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { AppointmentsRepo } from "~/repos/appointmentsRepo";
import { UserDataRepo } from "~/repos/userDataRepo";
import { AuthService } from "~/services/authService";

export type Repos = {
  appointments: AppointmentsRepo;
  userData: UserDataRepo;
};
export type Services = {
  auth: AuthService;
};
export type ThunkApiConfig = {
  extra: {
    repos: Repos;
    services: Services;
  };
};

export function createAsyncAppThunk<Returned, ThunkArg = void>(
  typePrefix: string,
  payloadCreator: AsyncThunkPayloadCreator<Returned, ThunkArg, ThunkApiConfig>,
  options?: AsyncThunkOptions<ThunkArg, ThunkApiConfig>
): AsyncThunk<Returned, ThunkArg, ThunkApiConfig> {
  return createAsyncThunk<Returned, ThunkArg, ThunkApiConfig>(
    typePrefix,
    payloadCreator,
    options
  );
}
