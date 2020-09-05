import { getRepository, Repository } from 'typeorm';

import IAppointmentsRepositories from '@modules/appointments/repositories/IAppointmentsRepository';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepositories {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });

    return findAppointment;
  }
}

export default AppointmentsRepository;
