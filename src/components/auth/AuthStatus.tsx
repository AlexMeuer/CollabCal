import React, { useEffect } from "react";
import { AccountCircle, ContentPaste } from "@mui/icons-material";
import {
  Box,
  Avatar,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
  Link,
  IconButton,
} from "@mui/material";
import { useSelector } from "react-redux";
import { selectAccount } from "~/redux";
import { useNavigate, useNavigation } from "react-router-dom";
import { Copyleft } from "~/components/Copyleft";

interface CopyableInfoProps {
  label: string;
  value: string;
  monospace?: boolean;
}
const CopyableInfo: React.FC<CopyableInfoProps> = ({
  label,
  value,
  monospace,
}) => (
  <Typography fontWeight="bold" component="div">
    {label}:{" "}
    <Box display="inline" fontFamily={monospace ? "monospace" : undefined}>
      {value}
    </Box>{" "}
    <IconButton
      size="small"
      color="inherit"
      aria-label="copy to clipboard"
      title="Copy to clipboard"
      onClick={() => navigator.clipboard.writeText(value)}
    >
      <ContentPaste fontSize="small" />
    </IconButton>
  </Typography>
);

export const AuthStatus: React.FC = () => {
  const navigate = useNavigate();
  const { status, session } = useSelector(selectAccount);
  useEffect(() => {
    if (status !== "loading" && !session) {
      navigate("/auth/in");
    }
  }, [session]);

  return (
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
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <AccountCircle />
      </Avatar>
      <Typography component="h1" variant="h5">
        {session?.clientName}
      </Typography>
      <Box mt={1} height="100%" display="flex" flexDirection="column">
        <CopyableInfo label="User ID" value={session?.userId || "unknown"} />
        <Button
          onClick={() => navigate("/auth/out")}
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Out
        </Button>

        <Copyleft />
      </Box>
    </Box>
  );
};
