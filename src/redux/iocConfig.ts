import { client, databases } from "~/infra/appwrite";
import { AppointmentsRepo } from "~/infra/appwrite/appointmentsRepo";
import { ThunkApiConfig } from "./ioc";

export const repos = {
  appointments: new AppointmentsRepo(client, databases),
};

export const config: ThunkApiConfig = {
  extra: {
    repos,
  },
};
