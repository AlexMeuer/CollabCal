import { UserData } from "shared-types/userData";
import * as firebase from "~/infra/firebase";
import { AppointmentsRepo as FirebaseAppointmentsRepo } from "~/infra/firebase/appointmentsRepo";
import { AuthService as FirebaseAuthService } from "~/infra/firebase/authService";
import { UserDataRepo as FirebaseUserDataRepo } from "~/infra/firebase/userDataRepo";
import { AppointmentsRepo as InMemoryAppointmentsRepo } from "~/infra/inMemory/appointmentsRepo";
import { AuthService as InMemoryAuthService } from "~/infra/inMemory/authService";
import { UserDataRepo as InMemoryUserDataRepo } from "~/infra/inMemory/userDataRepo";
import { AppointmentsRepo } from "~/repos/appointmentsRepo";
import { UserDataRepo } from "~/repos/userDataRepo";
import { AuthService } from "~/services/authService";
import { ThunkApiConfig } from "./ioc";

export interface IoCConfig {
  repos: {
    userData: UserDataRepo;
    appointments: AppointmentsRepo;
  };
  services: {
    auth: AuthService;
  };
}

// TODO: Use a proper DI container like `wessberg/DI` or Inversify.
const buildConfig = (): IoCConfig => {
  switch (import.meta.env.VITE_INFRA) {
    case "firebase":
      const { db, auth } = firebase.init();
      return {
        repos: {
          userData: new FirebaseUserDataRepo(db),
          appointments: new FirebaseAppointmentsRepo(db),
        },
        services: {
          auth: new FirebaseAuthService(auth),
        },
      };
    default:
      console.warn("No infra specified, using in-memory infra.");
    case "in-memory":
      return {
        repos: {
          userData: new InMemoryUserDataRepo(
            new Map<string, UserData>([
              [
                "fake-google-id",
                {
                  id: "fake-google-id",
                  name: "Not A Cat",
                  photoURL: "https://cataas.com/cat?w=100&h=100",
                },
              ],
            ])
          ),
          appointments: new InMemoryAppointmentsRepo(),
        },
        services: {
          auth: new InMemoryAuthService(),
        },
      };
  }
};

export const config: ThunkApiConfig = {
  extra: buildConfig(),
};
