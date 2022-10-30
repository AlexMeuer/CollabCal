import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Provider } from "react-redux";
import { store } from "~/redux/store";
import { ThemeProvider } from "~/ThemeProvider";
import { Outlet } from "react-router-dom";

export const Root: React.FC = () => (
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <CssBaseline />
        <Outlet />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
