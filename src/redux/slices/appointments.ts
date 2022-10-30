import { AppointmentModel } from "@devexpress/dx-react-scheduler";
import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";
import { AppointmentWithoutID } from "~/repos/appointmentsRepo";
import { Appointment } from "~/types/appointment";
import { createAsyncAppThunk } from "~/redux/ioc";
import { addMinutes, endOfDay } from "date-fns";

export const addAppointment = createAsyncAppThunk(
  "appointment/add",
  async (appointment: AppointmentModel, { extra }) => {
    const result = await extra.repos.appointments.create(
      AppointmentWithoutID.parse(appointment)
    );
    return mapToPresentationData(result);
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
    await extra.repos.appointments.update({
      id,
      deletedAt: new Date().toISOString(),
    });
    await extra.repos.appointments.delete(id);
    return id;
  }
);

export const fetchAppointments = createAsyncAppThunk(
  "appointments/fetch",
  async (_, { extra }) =>
    extra.repos.appointments
      .readAll()
      .then((appointments) => appointments.map(mapToPresentationData))
);

const mapToPresentationData = (appointment: Appointment) => {
  const startDate = new Date(appointment.startDate);
  return {
    ...appointment,
    description: appointment.description || "",
    startDate: startDate.toISOString(),
    endDate: (appointment.endDate
      ? new Date(appointment.endDate)
      : appointment.allDay
      ? endOfDay(startDate)
      : addMinutes(startDate, 5)
    ).toISOString(),
  };
};

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
  reducers: {
    setOne: (state, action: PayloadAction<Appointment>) => {
      if (action.payload.deletedAt) {
        state.appointments = state.appointments.filter(
          (a) => a.id !== action.payload.id
        );
      } else {
        const index = state.appointments.findIndex(
          (apt) => action.payload.id === apt.id
        );
        state.appointments.splice(
          index,
          index === -1 ? 0 : 1,
          mapToPresentationData(action.payload)
        );
      }
      if (state.status === "failed") {
        state.status = "idle";
      }
    },
  },
  extraReducers(builder) {
    // These reducers implicity rely on Immer to produce the next state.

    builder
      // .addCase(addAppointment.fulfilled, (state, action) => {
      //   state.appointments.push(action.payload);
      //   state.status = "idle";
      // })
      // .addCase(updateAppointment.fulfilled, (state, action) => {
      //   state.appointments = state.appointments.map(
      //     (appointment): AppointmentModel =>
      //       appointment.id === action.payload.id
      //         ? { appointment, ...mapToPresentationData(action.payload) }
      //         : appointment
      //   );
      //   state.status = "idle";
      // })
      // .addCase(deleteAppointment.fulfilled, (state, action) => {
      //   state.appointments = state.appointments.filter(
      //     (appointment) => appointment.id !== action.payload
      //   );
      //   state.status = "idle";
      // })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.appointments = action.payload;
        state.status = "idle";
      });

    builder
      .addMatcher(isFulfilled, (state) => {
        state.status = "idle";
      })
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
