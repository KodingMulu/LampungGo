import { Module } from '@nestjs/common';
import { MitraServicesService } from './mitra-services.service';
import { MitraServicesController } from './mitra-services.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MitraServicesController],
  providers: [MitraServicesService],
})
export class MitraServicesModule {}
