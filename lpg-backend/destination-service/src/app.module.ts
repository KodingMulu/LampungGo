import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DestinationsModule } from './destinations/destinations.module';

@Module({
  imports: [DestinationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
