import * as React from "react";
import { Grid, Paper } from "@mui/material";
import { Outlet } from "react-router-dom";

export interface SideImageLayoutProps {
  url: string | URL;
}

export const SideImageLayout: React.FC<SideImageLayoutProps> = ({ url }) => {
  return (
    <Grid
      container
      component="main"
      sx={{ height: "100vh", maxHeight: "100vh" }}
    >
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${url})`,
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Outlet />
      </Grid>
    </Grid>
  );
};
