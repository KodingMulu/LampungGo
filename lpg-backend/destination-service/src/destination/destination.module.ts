import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DestinationController } from './destination.controller';
import { DestinationService } from './destination.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: { host: '127.0.0.1', port: 8001 },
      },
    ]),
  ],
  controllers: [DestinationController],
  providers: [DestinationService],
})
export class DestinationModule {}
