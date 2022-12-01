import React from "react";
import { AppointmentMeta } from "@devexpress/dx-react-scheduler";
import { AppointmentTooltip } from "@devexpress/dx-react-scheduler-material-ui";
import { IconButton } from "@mui/material";
import * as Icons from "@mui/icons-material";

export interface TooltipCommandButtonProps
  extends AppointmentTooltip.CommandButtonProps {
  meta?: AppointmentMeta;
  isAuthed: boolean;
}

export const TooltipCommandButton: React.FC<TooltipCommandButtonProps> = ({
  id,
  onExecute,
  meta,
  isAuthed,
}) => {
  const isExternal = React.useMemo(() => meta?.data?.external, [meta]);
  const icon = React.useMemo(() => {
    switch (id) {
      case "delete":
        return isAuthed ? <Icons.Delete /> : null;
      case "open":
        return isAuthed ? (
          isExternal ? (
            <Icons.Preview />
          ) : (
            <Icons.Edit />
          )
        ) : null;
      case "close":
        return <Icons.Close />;
    }
  }, [id, isExternal]);

  return icon !== null ? (
    <IconButton onClick={onExecute}>{icon}</IconButton>
  ) : null;
};
