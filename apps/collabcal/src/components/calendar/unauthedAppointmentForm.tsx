import React from "react";
import { Box, Typography } from "@mui/material";
import { LoginControl } from "../auth/loginControl";
import { AppointmentForm } from "@devexpress/dx-react-scheduler-material-ui";

export const UnauthedAppointmentForm: React.FC<
  AppointmentForm.LayoutProps
> = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
        minHeight: "60vh",
        minWidth: "300px",
      }}
    >
      <Typography
        variant="h5"
        sx={{ m: 8, color: "secondary.main", textAlign: "center" }}
      >
        You must be signed in to create or edit appointments.
      </Typography>
      <LoginControl />
    </Box>
  );
};
