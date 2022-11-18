import React from "react";
import { Alert, IconButton, Typography } from "@mui/material";
import ContentPaste from "@mui/icons-material/ContentPaste";

export interface ErrorNoticeProps {
  message?: string;
  stack?: string;
}

export const ErrorNotice: React.FC<ErrorNoticeProps> = ({ message, stack }) => {
  return (
    <Alert severity="error">
      <Typography fontWeight="bold">
        {message || "Something went wrong but no message was given."}{" "}
        <IconButton
          size="small"
          color="inherit"
          aria-label="copy to clipboard"
          title="Copy to clipboard"
          onClick={() =>
            navigator.clipboard.writeText(
              stack || message || "Unspecified error"
            )
          }
        >
          <ContentPaste fontSize="small" />
        </IconButton>
      </Typography>
      {stack && <pre>{stack}</pre>}
    </Alert>
  );
};
