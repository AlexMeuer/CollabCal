import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Provider } from "react-redux";
import { store } from "~/redux/store";
import { ThemeProvider } from "~/ThemeProvider";
import { Outlet } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { NavBar } from "~/components/navbar";
import { AuthDialog } from "~/components/auth/dialog";
import { useDisclosure } from "~/hooks/useDisclosure";

export const Root: React.FC = () => {
  const authDialogDisclosure = useDisclosure();
  return (
    <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider>
          <CssBaseline />
          <SnackbarProvider>
            <NavBar
              title={import.meta.env.VITE_APP_NAME}
              onAuthRequested={authDialogDisclosure.open}
            />
            <Outlet />
            <AuthDialog
              open={authDialogDisclosure.isOpen}
              onClose={authDialogDisclosure.close}
            />
          </SnackbarProvider>
        </ThemeProvider>
      </Provider>
    </React.StrictMode>
  );
};
