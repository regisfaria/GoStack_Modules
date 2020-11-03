import React, { useCallback, useState } from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { FiClock, FiPower } from 'react-icons/fi';
import {
  Container,
  Calendar,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  NextAppointments,
  Section,
  Appointment,
} from './styles';

import logoImg from '../../assets/allbarber-logo.svg';
import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available) {
      setSelectedDate(day);
    }
  }, []);

  const { signOut, user } = useAuth();

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="AllBarber" />

          <Profile>
            <img src={user.imageUrl} alt={user.name} />

            <div>
              <span>Bem-vindo,</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Horários Agendados</h1>
          <p>
            <span>Hj</span>
            <span>Dia 06</span>
            <span>Segunda-feira</span>
          </p>

          <NextAppointments>
            <strong>Atendimento a seguir</strong>
            <div>
              <img
                src="https://avatars0.githubusercontent.com/u/44659603?s=460&u=9418cb394da1cdc1c4e103f1df7cad33009c595e&v=4"
                alt="Regis Faria"
              />
              <strong>Regis Faria</strong>
              <span>
                <FiClock />
                08:00
              </span>
            </div>
          </NextAppointments>

          <Section>
            <strong>Manha</strong>
            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img
                  src="https://avatars0.githubusercontent.com/u/44659603?s=460&u=9418cb394da1cdc1c4e103f1df7cad33009c595e&v=4"
                  alt="Regis Faria"
                />
                <strong>Regis Faria</strong>
              </div>
            </Appointment>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img
                  src="https://avatars0.githubusercontent.com/u/44659603?s=460&u=9418cb394da1cdc1c4e103f1df7cad33009c595e&v=4"
                  alt="Regis Faria"
                />
                <strong>Regis Faria</strong>
              </div>
            </Appointment>
          </Section>
          <Section>
            <strong>Tarde</strong>

            <Appointment>
              <span>
                <FiClock />
                15:00
              </span>

              <div>
                <img
                  src="https://avatars0.githubusercontent.com/u/44659603?s=460&u=9418cb394da1cdc1c4e103f1df7cad33009c595e&v=4"
                  alt="Regis Faria"
                />
                <strong>Regis Faria</strong>
              </div>
            </Appointment>

            <Appointment>
              <span>
                <FiClock />
                16:00
              </span>

              <div>
                <img
                  src="https://avatars0.githubusercontent.com/u/44659603?s=460&u=9418cb394da1cdc1c4e103f1df7cad33009c595e&v=4"
                  alt="Regis Faria"
                />
                <strong>Regis Faria</strong>
              </div>
            </Appointment>
          </Section>
        </Schedule>

        <Calendar>
          <DayPicker
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            fromMonth={new Date()}
            onDayClick={handleDateChange}
            disabledDays={[{ daysOfWeek: [0, 6] }]}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5] },
            }}
            selectedDays={selectedDate}
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro',
            ]}
          />
        </Calendar>
      </Content>
    </Container>
  );
};

export default Dashboard;
