import React from "react";
import {
  AppointmentMeta,
  AppointmentModel,
  ChangeSet,
  EditingState,
  IntegratedEditing,
  Resource,
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
  Resources,
} from "@devexpress/dx-react-scheduler-material-ui";
import { useSelector } from "react-redux";
import {
  Alert,
  Backdrop,
  Button,
  CircularProgress,
  Typography,
  Paper,
} from "@mui/material";
import { ErrorNotice } from "../errorNotice";
import { appointments, selectAppointments, useAppDispatch } from "~/redux";
import { useSnackbar } from "notistack";
import { TooltipCommandButton } from "./tooltopCommandButton";
import { TooltipContent } from "./tooltipContent";

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

  const resources: Resource[] = React.useMemo(
    () => [
      {
        fieldName: "eventType",
        instances: [
          { id: "normal", color: "#8bd5ca", text: "Normal" },
          { id: "external", color: "#b7bdf8", text: "External" },
        ],
      },
    ],
    []
  );

  // TODO: use something like `useCastingState<AppointmentMeta, MyAptModel>()` for better typing support.
  const [appointmentMeta, setAppointmentMeta] = React.useState<
    AppointmentMeta | undefined
  >(undefined);

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
        <Resources data={resources} mainResourceName="eventType" />
        <ConfirmationDialog />
        <AppointmentTooltip
          showCloseButton
          showOpenButton
          appointmentMeta={appointmentMeta}
          onAppointmentMetaChange={setAppointmentMeta}
          contentComponent={TooltipContent}
          commandButtonComponent={(props) => (
            <TooltipCommandButton {...props} meta={appointmentMeta} />
          )}
        />
        <AppointmentForm
          readOnly={appointmentMeta?.data.eventType === "external"}
        />
        <DragDropProvider />
        <CurrentTimeIndicator shadePreviousAppointments shadePreviousCells />
      </Scheduler>
    </Paper>
  );
};
