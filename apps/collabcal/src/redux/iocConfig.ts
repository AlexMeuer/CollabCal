import { auth, db } from "~/infra/firebase";
import { AppointmentsRepo } from "~/infra/firebase/appointmentsRepo";
import { AuthService } from "~/infra/firebase/authService";
import { ThunkApiConfig } from "./ioc";

export const repos = {
  appointments: new AppointmentsRepo(db),
};

const services = {
  auth: new AuthService(auth),
};

export const config: ThunkApiConfig = {
  extra: {
    repos,
    services,
  },
};
