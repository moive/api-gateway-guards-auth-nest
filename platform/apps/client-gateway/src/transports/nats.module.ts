import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { environmentsVariables, NATS_SERVICE } from '../config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: NATS_SERVICE,
        transport: Transport.NATS,
        options: {
          servers: environmentsVariables.natsServer,
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class NatsModule {}
