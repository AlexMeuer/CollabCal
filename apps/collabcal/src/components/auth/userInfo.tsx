import { Avatar, Box, Button, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { selectUserData } from "~/redux";
import { AuthSession } from "~/services/authService";
import { CopyableInfo } from "./copyableInfo";

export interface UserInfoProps {
  session: AuthSession;
  onLogoutRequested: () => void;
}

export const UserInfo: React.FC<UserInfoProps> = ({
  session,
  onLogoutRequested,
}) => {
  const { users } = useSelector(selectUserData);
  const user = users[session.id];
  return (
    <>
      <Avatar
        alt={user?.name || session?.id}
        src={user?.photoURL || session?.avatarURL}
        sx={{ m: 1, bgcolor: "secondary.main", width: 120, height: 120 }}
      />
      <Typography component="h1" variant="h5" color="primary" sx={{ m: 4 }}>
        {user?.name || session?.name || session?.id}
      </Typography>
      <Box mt={1} height="100%" display="flex" flexDirection="column">
        <CopyableInfo label="ID" value={session?.id || "unknown"} />
        <Button
          onClick={onLogoutRequested}
          fullWidth
          color="secondary"
          sx={{ my: 4 }}
        >
          Sign Out
        </Button>
      </Box>
    </>
  );
};
