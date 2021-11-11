import 'reflect-metadata';
import { Connection, createConnection } from 'typeorm';

import { UserEntity, VehicleEntity } from './entities';

export const initDb = async (): Promise<Connection> => {
  const entities = [UserEntity, VehicleEntity];
  const con = await createConnection({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'kirchteix',
    database: 'u4crypto',
    entities,
  });

  await con.synchronize(true);
  entities.forEach((entity) => console.log('created', entity.name));
  return con;
}
