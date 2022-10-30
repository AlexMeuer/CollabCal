import { AppointmentModel } from "@devexpress/dx-react-scheduler";
import {
  createSlice,
  isPending,
  isRejected,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";
import { AppointmentWithoutID } from "../../repos/appointmentsRepo";
import { Appointment } from "../../types/appointment";
import { createAsyncAppThunk } from "../ioc";

export const addAppointment = createAsyncAppThunk(
  "appointment/add",
  async (appointment: AppointmentModel, { extra }) => {
    const result = await extra.repos.appointments.create(
      AppointmentWithoutID.parse(appointment)
    );
    return ensureDatesAreStrings(result);
  }
);

export const updateAppointment = createAsyncAppThunk(
  "appointment/update",
  async (appointment: Partial<AppointmentModel>, { extra }) =>
    extra.repos.appointments.update(Appointment.parse(appointment))
);

export const deleteAppointment = createAsyncAppThunk(
  "appointment/delete",
  async (id: Appointment["id"], { extra }) => {
    await extra.repos.appointments.delete(id);
    return id;
  }
);

export const fetchAppointments = createAsyncAppThunk(
  "appointments/fetch",
  async (_, { extra }) =>
    extra.repos.appointments
      .readAll()
      .then((appointments) => appointments.map(ensureDatesAreStrings))
);

const ensureDatesAreStrings = (appointment: Appointment) => ({
  ...appointment,
  startDate: appointment.startDate.toString(),
  endDate: appointment.endDate
    ? new Date(appointment.endDate).toISOString()
    : undefined,
});

export interface AppointmentState {
  appointments: AppointmentModel[];
  status: "idle" | "loading" | "failed";
  error?: SerializedError;
}

export const appointmentsSlice = createSlice({
  name: "appointments",
  initialState: {
    appointments: [],
    status: "idle",
  } as AppointmentState,
  reducers: {},
  extraReducers(builder) {
    // These reducers implicity rely on Immer to produce the next state.

    builder
      .addCase(addAppointment.fulfilled, (state, action) => {
        state.appointments.push(action.payload);
        state.status = "idle";
      })
      .addCase(updateAppointment.fulfilled, (state, action) => {
        state.appointments = state.appointments.map(
          (appointment): AppointmentModel =>
            appointment.id === action.payload.id
              ? { appointment, ...action.payload }
              : appointment
        );
        state.status = "idle";
      })
      .addCase(deleteAppointment.fulfilled, (state, action) => {
        state.appointments = state.appointments.filter(
          (appointment) => appointment.id !== action.payload
        );
        state.status = "idle";
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.appointments = action.payload;
        state.status = "idle";
      });

    builder
      .addMatcher(isPending, (state) => {
        state.status = "loading";
      })
      .addMatcher(
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
