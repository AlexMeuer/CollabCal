import { GitHub } from "@mui/icons-material";
import { Box, Link, Typography, TypographyProps } from "@mui/material";
import React from "react";

export const Copyleft: React.FC<TypographyProps> = (overrides) => (
  <Typography
    variant="body2"
    color="text.secondary"
    align="center"
    width="100%"
    {...overrides}
  >
    Open Source GPLv3{" "}
    <Link
      component="a"
      href="https://www.github.com/alexmeuer/collabcal"
      target="_blank"
    >
      <GitHub
        sx={{
          verticalAlign: "bottom",
        }}
      />
    </Link>
  </Typography>
);
