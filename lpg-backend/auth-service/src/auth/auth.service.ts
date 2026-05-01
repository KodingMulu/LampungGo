import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import {
  ForgotPassword,
  LoginDto,
  RegisterDto,
  ResetPasswordDto,
  VerifyDto,
  VerifyResetOtpDto,
} from './dto/auth.dto';
import { JwtPayload } from './types/auth-payload.type';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    @Inject('NOTIFICATION_SERVICE') private notificationClient: ClientProxy,
  ) {}

  private generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async register(data: RegisterDto) {
    const { email, password, name } = data;

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new BadRequestException('Email sudah terdaftar');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = this.generateOtp();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    const user = await this.prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        otpCode: otp,
        otpExpiresAt: expiresAt,
        isVerified: false,
      },
    });

    this.notificationClient.emit('send_otp_email', {
      email: user.email,
      otp: otp,
      name: user.name,
    });

    return {
      message: 'Registrasi berhasil. Silakan cek email untuk kode OTP.',
      email: user.email,
    };
  }

  async verifyOtp(data: VerifyDto) {
    const { email, otpCode } = data;

    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) throw new BadRequestException('User tidak ditemukan');
    if (user.isVerified)
      throw new BadRequestException('User sudah terverifikasi');
    if (user.otpCode !== otpCode)
      throw new BadRequestException('Kode OTP salah');
    if (user.otpExpiresAt && user.otpExpiresAt < new Date()) {
      throw new BadRequestException('Kode OTP telah kadaluarsa');
    }

    await this.prisma.user.update({
      where: { email },
      data: {
        isVerified: true,
        otpCode: null,
        otpExpiresAt: null,
      },
    });

    return {
      message: 'Verifikasi OTP berhasil, silakan login.',
    };
  }

  async login(data: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (!user || !(await bcrypt.compare(data.password, user.password))) {
      throw new UnauthorizedException('Kredensial salah');
    }

    if (!user.isVerified) {
      throw new UnauthorizedException(
        'Akun belum terverifikasi. Silakan verifikasi OTP terlebih dahulu.',
      );
    }

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

  async forgotPassword(data: ForgotPassword) {
    const { email } = data;
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new BadRequestException(
        'Jika email terdaftar, kode OTP akan dikirimkan.',
      );
    }

    const otp = this.generateOtp();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    await this.prisma.user.update({
      where: { email },
      data: {
        otpCode: otp,
        otpExpiresAt: expiresAt,
      },
    });

    this.notificationClient.emit('send_reset_password_email', {
      email: user.email,
      otp: otp,
      name: user.name,
    });

    return {
      message:
        'Jika email terdaftar, kode OTP akan dikirimkan ke email tersebut.',
    };
  }

  async verifyResetOtp(data: VerifyResetOtpDto) {
    const { email, otpCode } = data;

    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) throw new BadRequestException('Permintaan tidak valid');
    if (user.otpCode !== otpCode)
      throw new BadRequestException('Kode OTP tidak valid');
    if (user.otpExpiresAt && user.otpExpiresAt < new Date()) {
      throw new BadRequestException('Kode OTP sudah kedaluwarsa');
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const newExpiresAt = new Date(Date.now() + 15 * 60 * 1000);

    await this.prisma.user.update({
      where: { email },
      data: {
        otpCode: resetToken,
        otpExpiresAt: newExpiresAt,
      },
    });

    return {
      message: 'OTP valid. Silakan lanjutkan untuk membuat password baru.',
      resetToken: resetToken,
    };
  }

  async resetPassword(data: ResetPasswordDto) {
    const { email, resetToken, newPassword } = data;

    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) throw new BadRequestException('Permintaan tidak valid');
    if (user.otpCode !== resetToken)
      throw new BadRequestException(
        'Sesi reset password tidak valid atau sudah kedaluwarsa',
      );
    if (user.otpExpiresAt && user.otpExpiresAt < new Date()) {
      throw new BadRequestException('Sesi reset password sudah kedaluwarsa');
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    await this.prisma.user.update({
      where: { email },
      data: {
        password: hashedNewPassword,
        otpCode: null,
        otpExpiresAt: null,
      },
    });

    return {
      message:
        'Password berhasil diubah. Silakan login dengan password baru Anda.',
    };
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        role: true,
      },
    });
  }

  async validateToken(token: string) {
    try {
      return await this.jwtService.verifyAsync<JwtPayload>(token);
    } catch {
      return null;
    }
  }
}
