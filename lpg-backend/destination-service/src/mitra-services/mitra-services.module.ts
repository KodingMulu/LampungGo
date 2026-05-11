import { Module } from '@nestjs/common';
import { MitraServicesService } from './mitra-services.service';
import { MitraServicesController } from './mitra-services.controller';

@Module({
  controllers: [MitraServicesController],
  providers: [MitraServicesService],
})
export class MitraServicesModule {}
