import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import ProfileController from '../controllers/ProfileController';

const profilesRouter = Router();
profilesRouter.use(ensureAuthenticated);

const profileController = new ProfileController();

profilesRouter.put('/', profileController.update);
profilesRouter.get('/', profileController.show);

export default profilesRouter;
