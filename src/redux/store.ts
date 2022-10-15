import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { consoleLogger } from "./middleware/consoleLogger";
import { accountSlice, loginWithEmail } from "./slices/account";
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
    getDefaultMiddleware().concat(consoleLogger),
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
store.dispatch(appointments.fetch()); // TODO: This probably shouldn't live here.

export const account = { ...accountSlice.actions, loginWithEmail };
export const selectAccount = (state: RootState) => state.account;
