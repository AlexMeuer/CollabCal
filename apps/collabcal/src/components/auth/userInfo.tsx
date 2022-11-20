import { AccountCircle } from "@mui/icons-material";
import { Avatar, Box, Button, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { selectUserData } from "~/redux";
import { AuthSession } from "~/services/authService";
import { CopyableInfo } from "./copyableInfo";

export interface UserInfoProps {
  session: AuthSession;
  onCalendarRequested: () => void;
  onLogoutRequested: () => void;
}

export const UserInfo: React.FC<UserInfoProps> = ({
  session,
  onCalendarRequested,
  onLogoutRequested,
}) => {
  const { users } = useSelector(selectUserData);
  const user = users[session.id];
  return (
    <>
      <Avatar
        src={user?.photoURL || session?.avatarURL}
        sx={{ m: 1, bgcolor: "secondary.main" }}
      >
        <AccountCircle />
      </Avatar>
      <Typography component="h1" variant="h5" sx={{ m: 4 }}>
        {user?.name || session?.name || session?.id}
      </Typography>
      <Box mt={1} height="100%" display="flex" flexDirection="column">
        <CopyableInfo label="ID" value={session?.id || "unknown"} />
        <CopyableInfo
          label="Name"
          value={user?.name || session?.name || "unknown"}
        />
        <Button
          onClick={onCalendarRequested}
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Calendar
        </Button>
        <Button onClick={onLogoutRequested} fullWidth>
          Sign Out
        </Button>
      </Box>
    </>
  );
};
