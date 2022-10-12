import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { appointmentsSlice } from "./slices/appointments";
import { themeModeSlice } from "./slices/themeMode";

export const store = configureStore({
  reducer: {
    theme: themeModeSlice.reducer,
    appointments: appointmentsSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export const themeMode = themeModeSlice.actions;
export const selectThemeMode = (state: RootState) => state.theme;

export const appointments = appointmentsSlice.actions;
export const selectAppointments = (state: RootState) => state.appointments;
