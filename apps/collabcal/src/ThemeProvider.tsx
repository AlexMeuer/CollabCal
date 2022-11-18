import React from "react";

import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";
import { useSelector } from "react-redux";
import { selectThemeMode } from "./redux/store";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";
import { LinkProps } from "@mui/material";

/**
 * @see https://mui.com/material-ui/guides/routing/#global-theme-link
 */
const LinkBehavior = React.forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, "to"> & { href: RouterLinkProps["to"] }
>((props, ref) => {
  const { href, ...other } = props;
  // Map href (MUI) -> to (react-router)
  return <RouterLink ref={ref} to={href} {...other} />;
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const themeMode = useSelector(selectThemeMode);
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeMode,
          primary: {
            main: "#f4dbd6",
          },
          secondary: {
            main: "#f5bde6",
          },
          error: {
            main: "#ed8796",
          },
          text: {
            primary: "#cad3f5",
            secondary: "#b8c0e0",
            disabled: "#939ab7",
          },
          info: {
            main: "#c6a0f6",
          },
          success: {
            main: "#a6da95",
          },
          divider: "#24273a",
          common: {
            black: "#cad3f5",
            white: "#181926",
          },
          background: {
            default: "#181926",
            paper: "#181926",
          },
        },
        components: {
          MuiLink: {
            defaultProps: {
              component: LinkBehavior,
            } as LinkProps,
          },
          MuiButtonBase: {
            defaultProps: {
              LinkComponent: LinkBehavior,
            },
          },
        },
      }),
    [themeMode]
  );
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};
