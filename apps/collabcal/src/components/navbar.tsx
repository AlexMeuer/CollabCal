import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import {
  selectAccount,
  selectUserDataOne,
  useAppDispatch,
  userData,
} from "~/redux";

export interface NavBarProps {
  title: string;
  onAuthRequested: () => void;
}

export const NavBar: React.FC<NavBarProps> = ({ title, onAuthRequested }) => {
  const dispatch = useAppDispatch();
  const { session } = useSelector(selectAccount);
  const userInfo = useSelector(selectUserDataOne(session?.id ?? ""));
  React.useEffect(() => {
    if (session) {
      dispatch(userData.fetchOne(session.id));
    }
  }, [session]);
  return (
    <AppBar position="static" sx={{ "box-shadow": "10px" }}>
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            fontWeight: 700,
            color: "primary.main",
            textDecoration: "none",
          }}
        >
          {title}
        </Typography>

        <Box
          sx={{
            flexGrow: 1,
            "justify-content": "end",
            display: "flex",
          }}
        >
          {session ? (
            <IconButton onClick={onAuthRequested} sx={{ padding: 0 }}>
              <Avatar
                alt={userInfo?.name}
                src={userInfo?.photoURL}
                sx={{ m: 1, bgcolor: "secondary.main" }}
              />
            </IconButton>
          ) : (
            <Button onClick={onAuthRequested}>Sign In</Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
