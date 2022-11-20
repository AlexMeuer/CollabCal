import { ContentPaste } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";

interface CopyableInfoProps {
  label: string;
  value: string;
  monospace?: boolean;
}
export const CopyableInfo: React.FC<CopyableInfoProps> = ({
  label,
  value,
  monospace,
}) => (
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
      onClick={() => navigator.clipboard.writeText(value)}
    >
      <ContentPaste fontSize="small" />
    </IconButton>
  </Typography>
);
