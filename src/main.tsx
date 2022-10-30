import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "~/routes";
import { account, appointments, store } from "./redux";

store.dispatch(account.fetch());

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={router} />
);
