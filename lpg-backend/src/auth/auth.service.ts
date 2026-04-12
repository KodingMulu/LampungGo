import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private mailerService: MailerService,
  ) {}

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

  async verify(email: string, code: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user || user.verificationCode !== code) {
      throw new BadRequestException(
        'Kode OTP salah atau email tidak ditemukan',
      );
    }

    await this.prisma.user.update({
      where: {
        email,
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
}
