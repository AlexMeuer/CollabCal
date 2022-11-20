import React from "react";
import ReactMarkdown from "react-markdown";
import { AppointmentModel } from "@devexpress/dx-react-scheduler";
import { AppointmentTooltip } from "@devexpress/dx-react-scheduler-material-ui";

interface ContentProps extends AppointmentTooltip.ContentProps {
  appointmentData: AppointmentModel;
}

export const TooltipContent: React.FC<ContentProps> = ({
  children,
  appointmentData,
  ...restProps
}) => (
  <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
    <ReactMarkdown>{appointmentData.description}</ReactMarkdown>
    {children}
  </AppointmentTooltip.Content>
);
