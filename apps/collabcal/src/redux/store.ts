import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { UserData } from "shared-types/userData";
import { config as servicesConfig } from "~/redux/iocConfig";
import { consoleLogger } from "~/redux/middleware/consoleLogger";
import {
  accountSlice,
  loginWithEmail,
  fetchSession,
  logout,
  loginWithGoogle,
} from "~/redux/slices/account";
import {
  appointmentsSlice,
  addAppointment,
  deleteAppointment,
  fetchAppointments,
  updateAppointment,
  sanitiseAppointment,
} from "~/redux/slices/appointments";
import { themeModeSlice } from "~/redux/slices/themeMode";
import { currentuserDataFetcher } from "./middleware/currentUserDataFetcher";
import { fetchUserData, userDataSlice } from "./slices/userData";

export const store = configureStore({
  devTools: import.meta.env.DEV,
  reducer: {
    theme: themeModeSlice.reducer,
    appointments: appointmentsSlice.reducer,
    account: accountSlice.reducer,
    userData: userDataSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: { extraArgument: servicesConfig.extra },
    }).concat([consoleLogger, currentuserDataFetcher]),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export const themeMode = themeModeSlice.actions;
export const selectThemeMode = (state: RootState) => state.theme;

export const appointments = {
  ...appointmentsSlice.actions,
  add: addAppointment,
  update: updateAppointment,
  delete: deleteAppointment,
  fetch: fetchAppointments,
};
export const selectAppointments = (state: RootState) => state.appointments;

export const account = {
  ...accountSlice.actions,
  loginWithEmail,
  loginWithGoogle,
  fetch: fetchSession,
  logout,
};
export const selectAccount = (state: RootState) => state.account;
export const useIsAuthed = () => useSelector(selectAccount).session !== null;

export const userData = { ...userDataSlice.actions, fetchOne: fetchUserData };
export const selectUserData = (state: RootState) => state.userData;
export const selectUserDataOne = (id: UserData["id"]) => (state: RootState) =>
  state.userData.users[id];

// PERF: make this an action to allow turning on/off?
servicesConfig.extra.repos.appointments.stream().subscribe((appointment) => {
  store.dispatch(
    appointmentsSlice.actions.setOne(sanitiseAppointment(appointment))
  );
});
store.dispatch(appointments.fetch());
