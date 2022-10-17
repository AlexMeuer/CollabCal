import { databases } from "../appwrite";
import { AppointmentsRepo } from "../infra/appwrite/appointmentsRepo";
import { ThunkApiConfig } from "./ioc";

export const config: ThunkApiConfig = {
  extra: {
    repos: {
      appointments: new AppointmentsRepo(databases),
    },
  },
};
