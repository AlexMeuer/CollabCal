import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { config as servicesConfig } from "./iocConfig";
import { consoleLogger } from "./middleware/consoleLogger";
import {
  accountSlice,
  loginWithEmail,
  fetchSession,
  logout,
} from "./slices/account";
import {
  addAppointment,
  appointmentsSlice,
  deleteAppointment,
  fetchAppointments,
  updateAppointment,
} from "./slices/appointments";
import { themeModeSlice } from "./slices/themeMode";

export const store = configureStore({
  devTools: import.meta.env.DEV,
  reducer: {
    theme: themeModeSlice.reducer,
    appointments: appointmentsSlice.reducer,
    account: accountSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: { extraArgument: servicesConfig.extra },
    }).concat(consoleLogger),
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
  fetch: fetchSession,
  logout,
};
export const selectAccount = (state: RootState) => state.account;
export const useIsAuthed = () => useSelector(selectAccount).session !== null;
