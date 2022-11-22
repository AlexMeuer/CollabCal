import { LockOutlined } from "@mui/icons-material";
import { Avatar, Box } from "@mui/material";
import React from "react";
import GoogleButton from "react-google-button";
import { useSelector } from "react-redux";
import { account, selectThemeMode, useAppDispatch } from "~/redux";

export const LoginControl: React.FC = () => {
  const dispatch = useAppDispatch();
  const themeMode = useSelector(selectThemeMode);
  return (
    <>
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlined />
      </Avatar>
      <Box sx={{ m: 4 }}>
        <GoogleButton
          type={themeMode}
          onClick={() => dispatch(account.loginWithGoogle())}
        />
      </Box>
    </>
  );
};
