import { db } from "~/infra/firebase";
import { AppointmentsRepo } from "~/infra/firebase/appointmentsRepo";
import { ThunkApiConfig } from "./ioc";

export const repos = {
  appointments: new AppointmentsRepo(db),
};

export const config: ThunkApiConfig = {
  extra: {
    repos,
  },
};
