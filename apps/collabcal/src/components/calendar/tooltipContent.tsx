import React from "react";
import ReactMarkdown from "react-markdown";
import { AppointmentModel } from "@devexpress/dx-react-scheduler";
import { AppointmentTooltip } from "@devexpress/dx-react-scheduler-material-ui";

export const TooltipContent: React.FC<AppointmentTooltip.ContentProps> = ({
  children,
  appointmentData,
  ...restProps
}) => (
  <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
    <ReactMarkdown>{appointmentData?.description}</ReactMarkdown>
    {children}
  </AppointmentTooltip.Content>
);
