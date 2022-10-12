import { AppointmentModel } from "@devexpress/dx-react-scheduler";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export const appointmentsSlice = createSlice({
  name: "appointments",
  initialState: [
    {
      id: 1,
      startDate: "2018-11-01T09:45",
      endDate: "2018-11-01T11:00",
      title: "Meeting",
    },
    {
      id: 2,
      startDate: "2018-11-01T12:00",
      endDate: "2018-11-01T13:30",
      title: "Go to a gym",
    },
  ] as AppointmentModel[],
  reducers: {
    add: {
      reducer: (state, action: PayloadAction<AppointmentModel>) => [
        ...state,
        action.payload,
      ],
      prepare: (appointment: AppointmentModel) => ({
        payload: {
          id: uuidv4(),
          ...appointment,
          startDate: new Date(appointment.startDate).toISOString(),
          endDate: appointment.endDate
            ? new Date(appointment.endDate).toISOString()
            : undefined,
        },
      }),
    },
    update: {
      reducer: (state, action: PayloadAction<Partial<AppointmentModel>>) => {
        const { id, ...rest } = action.payload;
        if (id === undefined) {
          console.error("Cannot update appointment without id", action.payload);
          return state;
        }
        return state.map((appointment) =>
          appointment.id == id ? { ...appointment, ...rest } : appointment
        );
      },
      prepare: (appointment: AppointmentModel) => ({
        payload: {
          ...appointment,
          startDate: new Date(appointment.startDate).toISOString(),
          endDate: appointment.endDate
            ? new Date(appointment.endDate).toISOString()
            : undefined,
        },
      }),
    },
    remove: (state, action: PayloadAction<AppointmentModel["id"]>) =>
      state.filter((appointment) => appointment.id !== action.payload),
  },
});
