import { createBrowserRouter, redirect } from "react-router-dom";
import { Root } from "~/layouts/root";
import { CalendarPage } from "~/components/calendar/calendar";
import { SideImageLayout } from "~/layouts/sideImage";
import { Auth } from "~/components/auth";

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
      {
        path: "auth",
        element: (
          <SideImageLayout url="https://source.unsplash.com/featured/800x1080?lisbon" />
        ),
        children: [
          {
            index: true,
            element: <Auth />,
          },
        ],
      },
    ],
  },
]);
