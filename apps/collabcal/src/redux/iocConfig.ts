import { auth, db } from "~/infra/firebase";
import { AppointmentsRepo } from "~/infra/firebase/appointmentsRepo";
import { AuthService } from "~/infra/firebase/authService";
import { UserDataRepo } from "~/infra/firebase/userDataRepo";
import { ThunkApiConfig } from "./ioc";

export const repos = {
  appointments: new AppointmentsRepo(db),
  userData: new UserDataRepo(db),
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
