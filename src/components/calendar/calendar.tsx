import React from "react";
import Paper from "@mui/material/Paper";
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
import { useSelector } from "react-redux";
import {
  Alert,
  Backdrop,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import { ErrorNotice } from "../ErrorNotice";
import { appointments, selectAppointments, useAppDispatch } from "~/redux";
import { useSnackbar } from "notistack";

const truncate = (str: string, n: number) => {
  return str.length > n ? str.slice(0, n - 1) + "&hellip;" : str;
};

export const CalendarPage: React.FC = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();
  const { status, appointments: data, error } = useSelector(selectAppointments);
  const onCommitChanges = React.useCallback(
    async ({ added, changed, deleted }: ChangeSet) => {
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
        const apt = data.find((a) => a.id === deleted)!;
        await dispatch(appointments.delete(deleted.toString()));
        enqueueSnackbar(
          `Deleted ${truncate(apt.title || "appointment.", 20)}`,
          {
            action: (
              <Button
                onClick={() =>
                  dispatch(appointments.add(apt)).then(() => closeSnackbar())
                }
              >
                Undo
              </Button>
            ),
          }
        );
      }
    },
    [data]
  );
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
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={status === "loading"}
      >
        <Alert severity="info">
          <Typography fontWeight="bold">
            Syncing appointments...{" "}
            <CircularProgress color="inherit" size="1rem" />
          </Typography>
        </Alert>
      </Backdrop>
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
};
