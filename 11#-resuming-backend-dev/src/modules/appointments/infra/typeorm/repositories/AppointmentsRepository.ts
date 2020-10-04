import { getRepository, Repository, Raw } from 'typeorm';

import IAppointmentsRepositories from '@modules/appointments/repositories/IAppointmentsRepository';

import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';

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

  public async findAllInMonthFromProvider({
    providerId,
    month,
    year,
  }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    // padStart will check if my string have firstParam(two) chars
    // and if dont, it will fill with the secondParam(zero) on left
    const parsedMonth = String(month).padStart(2, '0');

    const appointmentsInMonth = await this.ormRepository.find({
      where: {
        providerId,
        date: Raw(
          dateFieldName => `
          to_char(${dateFieldName}, 'MM-YYYY' = '${parsedMonth}-${year})
        `,
        ),
      },
    });

    return appointmentsInMonth;
  }

  public async create({
    providerId,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ providerId, date });

    await this.ormRepository.save(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
