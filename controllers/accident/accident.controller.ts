import { Connection, Repository } from 'typeorm';
import { ResponseToolkit, Request, ServerRoute } from 'hapi';

import { AccidentEntity } from '../../db/entities/accident.entity';
import { UserAccidentEntity, UserEntity } from '../../db/entities';
import { isValidUser } from '../../validations';
import { RoleType } from '../../db/entities/user.entity';

export const accidentController = (con: Connection): Array<ServerRoute> => {
  const userRepo: Repository<UserEntity> = con.getRepository(UserEntity);
  const accidentRepo: Repository<AccidentEntity> = con.getRepository(AccidentEntity);
  const userAccidentRepo: Repository<UserAccidentEntity> = con.getRepository(UserAccidentEntity);
  return [
    {
      method: 'GET',
      path: '/accident',
      handler: async (request: Request, res: ResponseToolkit, err?: Error) => {
        try {
          const doc = await accidentRepo.find();

          return res.response(doc);
        } catch ({ message }) {
          return res.response('Not Found').code(404);
        }
      }
    },
    {
      method: 'POST',
      path: '/accident',
      handler: async ({ payload }: Request, res: ResponseToolkit, err?: Error) => {
        try {
          const { description } = payload as Partial<AccidentEntity>;
          const { user, engageds } = payload as any;

          const foundUser: UserEntity = await userRepo.findOneOrFail({ where: { email: user.email, active: true } });
          if (!foundUser) return res.response('User not found').code(404)

          let foundEngageds = [];
          for await (const engaged of engageds) {
            
            const foundEngaged: UserEntity = await userRepo.findOne({ where: { email: engaged.email } });

            if (!foundEngaged) {
              isValidUser(engaged);
              const {
                fullName,
                email,
                document,
                address,
                vehiclePlate,
                vehicleModel
              } = engaged as Partial<UserEntity>;

              const role = RoleType.engaged;
              const user: Partial<UserEntity> = new UserEntity(
                fullName,
                email,
                document,
                address,
                vehiclePlate,
                vehicleModel,
                role);

              const doc = await userRepo.save<Partial<UserEntity>>(user);

              foundEngageds.push(doc);
            } else {
              foundEngageds.push(foundEngaged);
            }
          }


          const accident = new AccidentEntity(description);
          const accidentDoc = await accidentRepo.save(accident);

          const userAccident = new UserAccidentEntity(foundUser, accidentDoc);
          await userAccidentRepo.save(userAccident);

          for await (const foundEngaged of foundEngageds) {
            const engagedAccident = new UserAccidentEntity(foundEngaged, accidentDoc);
            await userAccidentRepo.save(engagedAccident);
          }

          return res.response({ accident: accidentDoc, user: foundUser, engageds: foundEngageds });
        } catch ({ message }) {
          return res.response('Not Found').code(404);
        }
      }
    },
    {
      method: 'GET',
      path: '/accident/{id}',
      handler: async ({ params }: Request, res: ResponseToolkit, err?: Error) => {
        try {
          const { id } = params;
          const doc = await accidentRepo.findOneOrFail(id);

          return res.response(doc);
        } catch ({ message }) {
          return res.response('Not Found').code(404);
        }
      }
    },
  ]
}