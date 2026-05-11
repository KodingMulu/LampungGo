import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DestinationsModule } from './destinations/destinations.module';
import { MitraServicesModule } from './mitra-services/mitra-services.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    DestinationsModule,
    AuthModule,
    DestinationsModule,
    MitraServicesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
