import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Provider } from "react-redux";
import { store } from "~/redux/store";
import { ThemeProvider } from "~/ThemeProvider";
import { Outlet } from "react-router-dom";
import { SnackbarProvider } from "notistack";

export const Root: React.FC = () => (
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <CssBaseline />
        <SnackbarProvider>
          <Outlet />
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
