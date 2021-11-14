import { Connection, Repository } from 'typeorm';
import { ResponseToolkit, Request, ServerRoute } from 'hapi';

import { UserEntity } from '../../db/entities/user.entity';

export const userController = (con: Connection): Array<ServerRoute> => {
  const userRepo: Repository<UserEntity> = con.getRepository(UserEntity);
  return [
    {
      method: 'GET',
      path: '/user',
      handler: async (request: Request, response: ResponseToolkit, err?: Error) => {
        return userRepo.find({
          select: ['id', 'fullName', 'email', 'address', 'role', 'vehicle'],
          where: { active: true }
        });
      }
    },
    {
      method: 'POST',
      path: '/user',
      handler: async ({ payload }: Request, response: ResponseToolkit, err?: Error) => {
        const { fullName, email, address } = payload as Partial<UserEntity>;
        const user: Partial<UserEntity> = new UserEntity(fullName, email, address);

        return userRepo.save<Partial<UserEntity>>(user);
      }
    },
    {
      method: 'GET',
      path: '/user/{id}',
      handler: async ({ params }: Request, response: ResponseToolkit, err?: Error) => {
        const { id } = params;
        const active = true;
        const user = await userRepo.findOne({ where: { id, active: true } });

        return user;
      }
    },
    {
      method: 'PATCH',
      path: '/user/{id}',
      handler: async ({ payload, params }: Request, response: ResponseToolkit, err?: Error) => {
        const { id } = params;
        const { fullName, address, email } = payload as Partial<UserEntity>;

        const user = await userRepo.findOneOrFail({ where: { id, active: true } });
        user.fullName = fullName;
        user.address = address;
        user.email = email;

        await userRepo.update(id, user);

        return user;
      }
    },
    {
      method: 'DELETE',
      path: '/user/{id}',
      handler: async ({ params }: Request, response: ResponseToolkit, err?: Error) => {
        const { id } = params;
        const user = await userRepo.findOneOrFail(id);
        user.active = false;
        user.deletedAt = new Date();

        await userRepo.update(id, user);

        return 'OK';
      }
    },
  ]
}