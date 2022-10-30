import React from "react";
import Paper from "@mui/material/Paper";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import {
  AppointmentModel,
  ChangeSet,
  EditingState,
  IntegratedEditing,
  ViewState,
} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  Appointments,
  WeekView,
  MonthView,
  DayView,
  Toolbar,
  ViewSwitcher,
  DateNavigator,
  TodayButton,
  AppointmentTooltip,
  AppointmentForm,
  DragDropProvider,
  ConfirmationDialog,
  CurrentTimeIndicator,
} from "@devexpress/dx-react-scheduler-material-ui";
import {
  appointments,
  selectAppointments,
  useAppDispatch,
} from "./redux/store";
import { useSelector } from "react-redux";
import { Alert, IconButton, Typography } from "@mui/material";
import { ErrorNotice } from "./components/ErrorNotice";

function App() {
  const dispatch = useAppDispatch();
  const onCommitChanges = React.useCallback(
    ({ added, changed, deleted }: ChangeSet) => {
      if (added) {
        // TODO: use safer typing
        dispatch(appointments.add(added as AppointmentModel));
      }
      if (changed) {
        for (const key in changed) {
          dispatch(appointments.update({ id: key, ...changed[key] }));
        }
      }
      if (deleted) {
        dispatch(appointments.delete(deleted.toString()));
      }
    },
    []
  );
  const { status, appointments: data, error } = useSelector(selectAppointments);
  const formattedData = React.useMemo(
    (): AppointmentModel[] =>
      data.map((apt) => ({
        ...apt,
        startDate: new Date(apt.startDate),
        endDate: apt.endDate ? new Date(apt.endDate) : undefined,
      })),
    [data]
  );
  return (
    <Paper>
      {status === "failed" && <ErrorNotice {...error} />}
      {/* @ts-ignore: TS complains that Scheduler doesn't have a children prop. */}
      <Scheduler data={formattedData}>
        <ViewState
          defaultCurrentDate={new Date()}
          defaultCurrentViewName="Month"
        />
        <WeekView startDayHour={0} endDayHour={24} />
        <MonthView />
        <DayView />

        <EditingState onCommitChanges={onCommitChanges} />
        <IntegratedEditing />

        <Toolbar />
        <DateNavigator />
        <TodayButton />
        <ViewSwitcher />
        <Appointments />
        <ConfirmationDialog />
        <AppointmentTooltip showCloseButton showOpenButton />
        <AppointmentForm />
        <DragDropProvider />
        <CurrentTimeIndicator shadePreviousAppointments shadePreviousCells />
      </Scheduler>
    </Paper>
  );
}

export default App;
