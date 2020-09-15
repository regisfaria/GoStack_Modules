import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

// below will make all appointments routes run the auth middleware
appointmentsRouter.use(ensureAuthenticated);
appointmentsRouter.post('/', appointmentsController.create);

/* appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  // below finds all
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
}); */

export default appointmentsRouter;
