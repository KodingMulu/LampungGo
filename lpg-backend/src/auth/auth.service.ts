import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';
import {
  ForgotPassword,
  LoginDto,
  RegisterDto,
  ResetPassword,
  VerifyDto,
} from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private mailerService: MailerService,
  ) {}

  /**
   * Register With OTP
   * Sending OTP to mail user using nodemailer
   */
  async register(data: RegisterDto) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    const user = await this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
        role: 'USER',
        verificationCode: otpCode,
      },
    });

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Kode Verifikasi Akun LampungGo',
      text: `Kode OTP Anda adalah: ${otpCode}`,
    });

    return {
      message: 'Registrasi berhasil. Silakan cek email untuk kode OTP.',
    };
  }

  /**
   * Verify Code OTP
   * Verify code sending to mail user
   */
  async verify(data: VerifyDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (!user || user.verificationCode !== data.code) {
      throw new BadRequestException(
        'Kode OTP salah atau email tidak ditemukan',
      );
    }

    await this.prisma.user.update({
      where: {
        email: data.email,
      },
      data: {
        isVerified: true,
        verificationCode: null,
      },
    });

    return {
      message: 'Akun berhasil diverifikasi. Silakan login.',
    };
  }

  /**
   * Login with data user verified
   */
  async login(data: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (!user) throw new UnauthorizedException('Email Tidak Terdaftar');

    if (!user.isVerified) {
      throw new UnauthorizedException('Akun anda belum di verifikasi');
    }

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) throw new UnauthorizedException('Password Salah!');

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
      },
    };
  }

  /**
   * Forgot password
   * sending otp to email
   */
  async forgotPassword(data: ForgotPassword) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (!user) throw new NotFoundException('Email tidak terdaftar');

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 15 * 60000);

    await this.prisma.user.update({
      where: {
        email: data.email,
      },
      data: {
        resetPasswordOtp: otp,
        resetOtpExpires: expires,
      },
    });

    await this.mailerService.sendMail({
      to: data.email,
      subject: 'Reset Password LampungGo',
      text: `Kode OTP reset password Anda adalah: ${otp}. Kode ini berlaku selama 15 menit.`,
    });

    return {
      message: 'Kode OTP telah dikirim ke email',
    };
  }

  /**
   * Reset Password
   * when accept code forgot password
   * reset password allowed
   */
  async resetPassword(data: ResetPassword) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: data.email,
        resetPasswordOtp: data.code,
        resetOtpExpires: { gt: new Date() },
      },
    });
    if (!user)
      throw new BadRequestException('Kode OTP salah atau sudah kadaluwarsa');

    const hashedPassword = await bcrypt.hash(data.newPass, 10);
    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
        resetPasswordOtp: null,
        resetOtpExpires: null,
      },
    });

    return {
      message: 'Password berhasil diperbarui, silakan login',
    };
  }
}
