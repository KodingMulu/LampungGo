import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;
  private readonly logger = new Logger(MailService.name);

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }

  async sendOtpEmail(data: { email: string; name: string; otp: string }) {
    const mailOptions = {
      from: '"LampungGo" <noreply@lampunggo.com>',
      to: data.email,
      subject: 'Verifikasi OTP LampungGo',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h3>Halo ${data.name},</h3>
          <p>Terima kasih telah mendaftar di <b>LampungGo</b>. Berikut adalah kode OTP Anda untuk verifikasi akun:</p>
          <div style="background-color: #f4f4f4; padding: 15px; border-radius: 8px; display: inline-block;">
            <h1 style="color: #333; margin: 0; letter-spacing: 4px;">${data.otp}</h1>
          </div>
          <p style="color: #666; font-size: 14px;">Kode ini akan kedaluwarsa dalam 15 menit.</p>
          <p style="color: #999; font-size: 12px;">Jika Anda tidak merasa mendaftar, silakan abaikan email ini.</p>
        </div>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      this.logger.log(`Email OTP berhasil terkirim ke ${data.email}`);
    } catch (error) {
      this.logger.error(`Gagal mengirim email ke ${data.email}`, error);
    }
  }
}
