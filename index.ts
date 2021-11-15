import * as Hapi from '@hapi/hapi';
import { Server, ResponseToolkit, Request } from 'hapi';
import { Connection } from 'typeorm';
import { userController, accidentController } from './controllers';
require('dotenv').config();

import { initDb } from './db';

const initi = async () => {
  const server: Server = Hapi.server({
    port: process.env.API_PORT,
    host: process.env.API_HOST
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: (request: Request, response: ResponseToolkit, err?: Error) => {
      return 'Hello' 
    }
  })

  const con: Connection =  await initDb();

  server.route([
    ...userController(con),
    ...accidentController(con),
  ]);

  await server.start().then();
  console.log(`Server start at ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit();
})

initi();
