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
        return <Icons.Delete />;
      case "open":
        return isExternal ? <Icons.Preview /> : <Icons.Edit />;
      case "close":
        return <Icons.Close />;
    }
  }, [id, isExternal]);

  return isAuthed ? <IconButton onClick={onExecute}>{icon}</IconButton> : null;
};
