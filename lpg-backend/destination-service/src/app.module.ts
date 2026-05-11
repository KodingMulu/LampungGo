import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DestinationsModule } from './destinations/destinations.module';
import { MitraServicesModule } from './mitra-services/mitra-services.module';

@Module({
  imports: [DestinationsModule, MitraServicesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
