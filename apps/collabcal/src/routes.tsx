import { createBrowserRouter, redirect } from "react-router-dom";
import { Root } from "~/layouts/root";
import { SignInPage } from "~/components/auth/SignIn";
import { CalendarPage } from "~/components/calendar/calendar";
import { SideImageLayout } from "./layouts/sideImage";
import { AuthStatus } from "./components/auth/AuthStatus";
import { account, store } from "./redux";

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
      // {
      //   path: "auth",
      //   element: <SignInPage />,
      //   loader: ({ request }) =>
      //     fetch("/api/dashboard.json", {
      //       signal: request.signal,
      //     }),
      // },
      {
        path: "auth",
        element: (
          <SideImageLayout url="https://source.unsplash.com/featured/800x1080?lisbon" />
        ),
        children: [
          {
            index: true,
            element: <AuthStatus />,
          },
          {
            path: "in",
            element: <SignInPage />,
          },
          {
            path: "out",
            loader: () =>
              store.dispatch(account.logout()).then(() => redirect("/auth/in")),
          },
        ],
      },
    ],
  },
]);
