import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import UpdateUserImageService from './UpdateUserImageService';

describe('UpdateUserImage', () => {
  it('should be able to update user image', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserImage = new UpdateUserImageService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'examplepass',
    });

    await updateUserImage.execute({
      userId: user.id,
      imageFileName: 'someImage.jpg',
    });

    expect(user.image).toBe('someImage.jpg');
  });

  it('should not be able to update user image from a non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserImage = new UpdateUserImageService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    expect(
      updateUserImage.execute({
        userId: 'non-existing-user',
        imageFileName: 'someImage.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old user image when updating a new one', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const updateUserImage = new UpdateUserImageService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'examplepass',
    });

    await updateUserImage.execute({
      userId: user.id,
      imageFileName: 'someImage.jpg',
    });

    await updateUserImage.execute({
      userId: user.id,
      imageFileName: 'otherImage.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('someImage.jpg');

    expect(user.image).toBe('otherImage.jpg');
  });
});
