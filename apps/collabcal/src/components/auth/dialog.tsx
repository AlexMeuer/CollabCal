import { Box, CircularProgress, Dialog, DialogProps } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { account, selectAccount, useAppDispatch } from "~/redux";
import { Copyleft } from "~/components/copyleft";
import { LoginControl } from "./loginControl";
import { UserInfo } from "./userInfo";

export type AuthDialogProps = Pick<DialogProps, "open" | "onClose">;

export const AuthDialog: React.FC<AuthDialogProps> = (props) => {
  return (
    <Dialog {...props} maxWidth="xl">
      <DialogContent />
    </Dialog>
  );
};

const DialogContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const { status, session } = useSelector(selectAccount);

  if (status === "loading") {
    return (
      <Container>
        <CircularProgress sx={{ margin: "auto" }} />
      </Container>
    );
  }

  if (session) {
    return (
      <Container>
        <UserInfo
          session={session}
          onLogoutRequested={() => dispatch(account.logout())}
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
      p: 4,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      height: "100%",
      minHeight: "60vh",
      minWidth: "300px",
    }}
  >
    {children}
    <Copyleft sx={{ marginTop: "auto" }} />
  </Box>
);
