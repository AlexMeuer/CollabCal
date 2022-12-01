import { createBrowserRouter } from "react-router-dom";
import { Root } from "~/layouts/root";
import { CalendarPage } from "~/components/calendar/calendar";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: undefined, // TODO
    children: [
      {
        path: "/",
        element: <CalendarPage />,
      },
    ],
  },
]);
