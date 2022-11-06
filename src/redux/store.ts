import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { config as servicesConfig, repos } from "~/redux/iocConfig";
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
  loginWithGoogle,
  fetch: fetchSession,
  logout,
};
export const selectAccount = (state: RootState) => state.account;
export const useIsAuthed = () => useSelector(selectAccount).session !== null;

repos.appointments.stream().subscribe((appointment) => {
  store.dispatch(
    appointmentsSlice.actions.setOne(sanitiseAppointment(appointment))
  );
});
store.dispatch(appointments.fetch());
