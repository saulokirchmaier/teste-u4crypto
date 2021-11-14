import { Connection, Repository } from 'typeorm';
import { ResponseToolkit, Request, ServerRoute } from 'hapi';

import { VehicleEntity } from '../../db/entities/vehicle.entity';
import { UserEntity } from '../../db/entities';

export const vehicleController = (con: Connection): Array<ServerRoute> => {
  const vehicleRepo: Repository<VehicleEntity> = con.getRepository(VehicleEntity);
  const userRepo: Repository<UserEntity> = con.getRepository(UserEntity);
  return [
    {
      method: 'GET',
      path: '/vehicle',
      handler: async (request: Request, response: ResponseToolkit, err?: Error) => {
        try {
          const doc = vehicleRepo.find({
            select: ['id', 'plate', 'model', 'userId'],
          });

          return doc;
        } catch (error) {
          console.log('error: ', error);
        }
      }
    },
    {
      method: 'POST',
      path: '/vehicle',
      handler: async ({ payload }: Request, res: ResponseToolkit, err?: Error) => {
        try {
          const { plate, model, userId } = payload as Partial<VehicleEntity>;
          const vehicle: Partial<VehicleEntity> = new VehicleEntity(plate, model, userId);

          const activeUser = await userRepo.findOneOrFail({
            where: { id: userId, active: true }
          });

          const doc = await vehicleRepo.save<Partial<VehicleEntity>>(vehicle);


          activeUser.vehicle = doc;

          await userRepo.update(userId, activeUser)

          return res.response(doc);
        } catch ({ message }) {
          return res.response(message);
        }

      }
    },
    {
      method: 'GET',
      path: '/vehicle/{id}',
      handler: async ({ params }: Request, res: ResponseToolkit, err?: Error) => {
        try {
          const { id } = params;
          const doc = await vehicleRepo.findOneOrFail({
            select: ['id', 'plate', 'model', 'userId'],
            where: { id },
          });

          return res.response(doc);
        } catch ({ message }) {
          return res.response(message).code(404);
        }
      }
    },
  ]
}