import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import uploadConfig from '../config/upload';
import User from '../models/User';
import AppError from '../errors/AppError';

interface Request {
  userId: string;
  imageFileName: string;
}

export default class UpdateUserAvatarServie {
  public async execute({ userId, imageFileName }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(userId);

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

    await userRepository.save(user);

    return user;
  }
}
