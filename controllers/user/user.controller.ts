import { Connection, Repository } from 'typeorm';
import { ResponseToolkit, Request, ServerRoute } from 'hapi';

import { UserEntity } from '../../db/entities/user.entity';
import { isValidUser } from '../../validations';

export const userController = (con: Connection): Array<ServerRoute> => {
  const userRepo: Repository<UserEntity> = con.getRepository(UserEntity);
  return [
    {
      method: 'GET',
      path: '/user',
      handler: async (request: Request, res: ResponseToolkit, err?: Error) => {
        try {
          const doc = await userRepo.find({
            select: ['id', 'fullName', 'email', 'document', 'address', 'role', 'vehiclePlate', 'vehicleModel'],
            where: { active: true },
          });

          return res.response(doc);
        } catch ({ message }) {
          return res.response(message);
        }
      }
    },
    {
      method: 'POST',
      path: '/user',
      handler: async ({ payload }: Request, res: ResponseToolkit, err?: Error) => {
        try {
          isValidUser(payload);

          const { fullName, email, document, address, vehiclePlate, vehicleModel } = payload as Partial<UserEntity>;
          const user: Partial<UserEntity> = new UserEntity(fullName, email, document, address, vehiclePlate, vehicleModel);
          
          const doc = await userRepo.save<Partial<UserEntity>>(user);

          return res.response(doc).code(201);
        } catch ({ message }) {
          return res.response(message);
        }
      }
    },
    {
      method: 'GET',
      path: '/user/{id}',
      handler: async ({ params }: Request, res: ResponseToolkit, err?: Error) => {
        try {
          const { id } = params;
          const doc = await userRepo.findOneOrFail({
            select: ['id', 'fullName', 'email', 'document', 'address', 'role', 'vehiclePlate', 'vehicleModel'],
            where: { id, active: true }
          });

          return res.response(doc);
        } catch ({ message }) {
          return res.response(message);
        }
      }
    },
    {
      method: 'PATCH',
      path: '/user/{id}',
      handler: async ({ payload, params }: Request, res: ResponseToolkit, err?: Error) => {
        try {
          isValidUser(payload);
          
          const { id } = params;
          const { fullName, email, document, address, vehiclePlate, vehicleModel } = payload as Partial<UserEntity>;

          const user = await userRepo.findOneOrFail({ where: { id, active: true } });
          user.fullName = fullName;
          user.document = document;
          user.address = address;
          user.email = email;
          user.vehiclePlate = vehiclePlate;
          user.vehicleModel = vehicleModel;

          await userRepo.update(id, user);

          return res.response(user);
        } catch ({ message }) {
          return res.response(message);
        }
      }
    },
    {
      method: 'DELETE',
      path: '/user/{id}',
      handler: async ({ params }: Request, res: ResponseToolkit, err?: Error) => {
        try {
          const { id } = params;
          const user = await userRepo.findOneOrFail(id);
          user.active = false;
          user.deletedAt = new Date();

          await userRepo.update(id, user);

          return res.response();
        } catch ({ message }) {
          return res.response(message);
        }
      }
    },
  ]
}