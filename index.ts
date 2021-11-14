import * as Hapi from '@hapi/hapi';
import { Server, ResponseToolkit, Request } from 'hapi';
import { Connection } from 'typeorm';
import { userController, vehicleController } from './controllers';

import { initDb } from './db';

const initi = async () => {
  const server: Server = Hapi.server({
    port: 3000,
    host: 'localhost'
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: (request: Request, response: ResponseToolkit, err?: Error) => {
      return 'Hello Hapi' 
    }
  })

  const con: Connection =  await initDb();

  server.route([
    ...userController(con),
    ...vehicleController(con),
  ]);

  await server.start().then();
  console.log(`Server start at ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit();
})

initi();
