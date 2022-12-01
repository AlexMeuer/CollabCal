import {
  AppointmentsRepo as AppointmentsRepoInterface,
  AppointmentWithoutID,
} from "~/repos/appointmentsRepo";
import { Appointment } from "shared-types/appointment";
import { BehaviorSubject, mergeAll } from "rxjs";

export class AppointmentsRepo implements AppointmentsRepoInterface {
  private subject = new BehaviorSubject([] as Appointment[]);

  create(appointment: AppointmentWithoutID): Promise<Appointment> {
    const newAppointment: Appointment = {
      ...appointment,
      id: Date.now().toString(),
    };
    this.subject.next([...this.appointments, newAppointment]);
    return Promise.resolve(newAppointment);
  }

  read(id: Appointment["id"]): Promise<Appointment | undefined> {
    return Promise.resolve(this.appointments.find((a) => a.id === id));
  }

  readAll(): Promise<Appointment[]> {
    return Promise.resolve(this.appointments);
  }

  update(appointment: Pick<Appointment, "id"> & Partial<Appointment>) {
    const apts = this.appointments;
    const i = apts.findIndex((a) => a.id === appointment.id);
    apts[i] = { ...apts[i], ...appointment };
    return Promise.resolve(apts[i]);
  }

  delete(id: Appointment["id"]) {
    this.subject.next(this.appointments.filter((a) => a.id !== id));
    return Promise.resolve();
  }

  stream() {
    return this.subject.pipe(mergeAll());
  }

  private get appointments() {
    return this.subject.value;
  }
}
