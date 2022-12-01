import React from "react";
import { ContentPaste } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { useSnackbar } from "notistack";

interface CopyableInfoProps {
  label: string;
  value: string;
  monospace?: boolean;
}
export const CopyableInfo: React.FC<CopyableInfoProps> = ({
  label,
  value,
  monospace,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const copyToClipboard = React.useCallback(() => {
    navigator.clipboard.writeText(value);
    enqueueSnackbar("Copied to clipboard: " + value, { variant: "info" });
  }, [value]);
  return (
    <Typography component="div">
      {label}:{" "}
      <Box display="inline" fontFamily={monospace ? "monospace" : undefined}>
        {value}
      </Box>{" "}
      <IconButton
        size="small"
        color="inherit"
        aria-label="copy to clipboard"
        title="Copy to clipboard"
        onClick={copyToClipboard}
      >
        <ContentPaste fontSize="small" />
      </IconButton>
    </Typography>
  );
};
