import { AppointmentModel } from "@devexpress/dx-react-scheduler";
import {
  createAsyncThunk,
  createSlice,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import { ID } from "appwrite";
import { databases } from "../../appwrite";

//! TODO: Refactor AppWrite out of here. It shouldn't be a hard dependency.

export const addAppointment = createAsyncThunk(
  "appointment/add",
  async (appointment: AppointmentModel): Promise<AppointmentModel> => {
    delete appointment.id;
    const id = ID.unique();
    //? TODO: Consider parsing the returned document and returning that. (Use Zod or another schema library)
    const { $id } = await databases.createDocument(
      "main",
      "appointments",
      id,
      appointment
    );
    return { ...ensureDatesAreStrings(appointment), id: $id };
  }
);

export const updateAppointment = createAsyncThunk(
  "appointment/update",
  async (
    appointment: Partial<AppointmentModel>
  ): Promise<Partial<AppointmentModel>> => {
    const { id, ...data } = appointment;
    if (!id) {
      throw new Error("Appointment must have an id");
    }
    await databases.updateDocument("main", "appointments", id.toString(), data);
    return appointment;
  }
);

export const deleteAppointment = createAsyncThunk(
  "appointment/delete",
  async (id: AppointmentModel["id"], { getState }) => {
    if (!id) {
      throw new Error("Appointment must have an id");
    }
    await databases.deleteDocument("main", "appointments", id.toString());
    return id;
  }
);

export const fetchAppointments = createAsyncThunk(
  "appointments/fetch",
  async () => {
    const result = await databases.listDocuments("main", "appointments");
    return result.documents.map(
      (doc) =>
        ensureDatesAreStrings({
          ...doc,
          id: doc.$id,
        } as unknown as AppointmentModel) //! TODO: Use Zod to parse.
    );
  }
);

const ensureDatesAreStrings = (appointment: AppointmentModel) => ({
  ...appointment,
  startDate: appointment.startDate.toString(),
  endDate: appointment.endDate
    ? new Date(appointment.endDate).toISOString()
    : undefined,
});

export interface AppointmentState {
  appointments: AppointmentModel[];
  status: "idle" | "loading" | "failed";
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
          (appointment) =>
            (appointment.id === action.payload.id
              ? { appointment, ...action.payload }
              : appointment) as AppointmentModel
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
      .addMatcher(isRejected, (state) => {
        state.status = "failed";
      });
  },
});
