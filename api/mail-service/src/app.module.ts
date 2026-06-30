import { Module } from '@nestjs/common';
import { MailController } from './mail/mail.controller';
import { MailService } from './mail/mail.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [MailController],
  providers: [MailService],
})
export class AppModule {}
