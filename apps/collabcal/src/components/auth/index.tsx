import { Box, CircularProgress } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectAccount } from "~/redux";
import { Copyleft } from "~/components/copyleft";
import { LoginControl } from "./loginControl";
import { UserInfo } from "./userInfo";

export const Auth: React.FC = () => {
  const navigate = useNavigate();
  const { status, session } = useSelector(selectAccount);

  if (status === "loading") {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100%"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (session) {
    return (
      <Container>
        <UserInfo
          session={session}
          onCalendarRequested={() => navigate("/")}
          onLogoutRequested={() => navigate("/auth/out")}
        />
      </Container>
    );
  }

  return (
    <Container>
      <LoginControl />
    </Container>
  );
};

interface ContainerProps {
  children: React.ReactNode;
}
const Container: React.FC<ContainerProps> = ({ children }) => (
  <Box
    sx={{
      py: 8,
      px: 4,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      height: "100%",
    }}
  >
    {children}
    <Copyleft />
  </Box>
);
