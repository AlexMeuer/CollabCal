import React from "react";

import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";
import { useSelector } from "react-redux";
import { selectThemeMode } from "./redux/store";

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const themeMode = useSelector(selectThemeMode);
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeMode,
        },
      }),
    [themeMode]
  );
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};
