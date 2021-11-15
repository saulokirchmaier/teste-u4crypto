import 'reflect-metadata';
import { Connection, createConnection } from 'typeorm';

import { UserEntity, AccidentEntity, UserAccidentEntity } from './entities';

export const initDb = async (): Promise<Connection> => {
  const entities = [UserEntity, AccidentEntity, UserAccidentEntity];
  const con = await createConnection({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1234',
    database: 'u4c',
    entities,
    logging: ['error'],
    logger: 'advanced-console',
  });

  await con.synchronize(true);
  entities.forEach((entity) => console.log('created', entity.name));
  return con;
}
