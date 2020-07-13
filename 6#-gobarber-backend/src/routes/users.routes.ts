import { Router } from 'express';
import { getRepository } from 'typeorm';
import multer from 'multer';
import uploadConfig from '../config/upload';

import User from '../models/User';
import CreateUserService from '../services/CreateUserService';
import UpdateUserImageService from '../services/UpdateUserImageService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.get('/', async (request, response) => {
  const userRepository = getRepository(User);

  const users = await userRepository.find();

  users.forEach(user => {
    // eslint-disable-next-line no-param-reassign
    delete user.password;
  });

  return response.json(users);
});

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({
    name,
    email,
    password,
  });

  // We can't show user's password when listing
  delete user.password;

  return response.json(user);
});

usersRouter.patch(
  '/image',
  ensureAuthenticated,
  upload.single('user-image'),
  async (request, response) => {
    const updateUserImage = new UpdateUserImageService();

    const user = await updateUserImage.execute({
      userId: request.user.id,
      imageFileName: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  },
);

export default usersRouter;
