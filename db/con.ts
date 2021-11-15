import 'reflect-metadata';
import { Connection, createConnection } from 'typeorm';
require('dotenv').config();

import { UserEntity, AccidentEntity, UserAccidentEntity } from './entities';

export const initDb = async (): Promise<Connection> => {
  const entities = [UserEntity, AccidentEntity, UserAccidentEntity];
  const con = await createConnection({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities,
    logging: ['error'],
    logger: 'advanced-console',
  });

  await con.synchronize(true);
  entities.forEach((entity) => console.log('created', entity.name));
  return con;
}
