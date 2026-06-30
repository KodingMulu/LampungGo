import { Controller, Logger } from '@nestjs/common';
import { MailService } from './mail.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class MailController {
  private readonly logger = new Logger(MailController.name);

  constructor(private readonly mailService: MailService) {}

  @EventPattern('send_otp_email')
  async handleSendOtpEvent(
    @Payload() data: { email: string; name: string; otp: string },
  ) {
    this.logger.log(`Menerima event send_otp_email untuk: ${data.email}`);

    await this.mailService.sendOtpEmail(data);
  }

  @EventPattern('send_reset_password_email')
  async handleSendResetPasswordEvent(
    @Payload() data: { email: string; name: string; otp: string },
  ) {
    this.logger.log(
      `Menerima event send_reset_password_email untuk: ${data.email}`,
    );

    await this.mailService.sendOtpResetEmail(data);
  }
}
