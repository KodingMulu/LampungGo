import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DestinationModule } from './destination/destination.module';

@Module({
  imports: [DestinationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
