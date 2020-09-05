import Appointments from '../infra/typeorm/entities/Appointment';

export default interface IAppointmentsRepository {
  create(): Promise<Appointments>;
  findByDate(date: Date): Promise<Appointments | undefined>;
}
