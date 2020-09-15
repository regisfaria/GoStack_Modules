import path from 'path';
import fs from 'fs';
import { injectable, inject } from 'tsyringe';

import uploadConfig from '@config/upload';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

interface Request {
  userId: string;
  imageFileName: string;
}

@injectable()
export default class UpdateUserAvatarServie {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ userId, imageFileName }: Request): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401);
    }

    // Delete old image
    if (user.image) {
      const userImageFilePath = path.join(uploadConfig.directory, user.image);
      const userImageFileExists = await fs.promises.stat(userImageFilePath);

      if (userImageFileExists) {
        await fs.promises.unlink(userImageFilePath);
      }
    }

    user.image = imageFileName;

    await this.usersRepository.save(user);

    return user;
  }
}
