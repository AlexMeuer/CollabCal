import React from "react";
import ReactMarkdown from "react-markdown";
import { AppointmentTooltip } from "@devexpress/dx-react-scheduler-material-ui";
import { Link, Typography } from "@mui/material";

export const TooltipContent: React.FC<AppointmentTooltip.ContentProps> = ({
  children,
  appointmentData,
  ...restProps
}) => (
  <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
    <ReactMarkdown
      components={{
        a: ({ node, ...props }) => <Link {...props} target="_blank" />,
      }}
    >
      {appointmentData?.description}
    </ReactMarkdown>
    {children}
  </AppointmentTooltip.Content>
);
