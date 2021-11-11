import { Connection, Repository } from 'typeorm';
import { ResponseToolkit, Request, ServerRoute } from 'hapi';

import { UserEntity } from '../../db/entities/user.entity';

export const userController = (con: Connection): Array<ServerRoute> => {
  const userRepo: Repository<UserEntity> = con.getRepository(UserEntity);
  return [
    {
      method: 'GET',
      path: '/user',
      handler: (request: Request, response: ResponseToolkit, err?: Error) => {
        return userRepo.find();
      }
    },
    {
      method: 'POST',
      path: '/user',
      handler: ({ payload }: Request, response: ResponseToolkit, err?: Error) => {
        const { fullName, address, email } = payload as Partial<UserEntity>;
        const user: Partial<UserEntity> = new UserEntity(fullName, address, email);
        
        return userRepo.save<Partial<UserEntity>>(user);
      }
    }
  ]
}