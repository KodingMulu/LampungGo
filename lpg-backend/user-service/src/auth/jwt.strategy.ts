import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { Request } from 'express';

export interface JwtPayload {
  sub: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private prisma: PrismaService,
    @Inject('AUTH_SERVICE') private authClient: ClientProxy,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    super({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'rahasia-negara-lampunggo',
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JwtPayload) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('Token tidak ditemukan');
    }

    const token = authHeader.split(' ')[1];

    try {
      const isBlacklisted = await firstValueFrom(
        this.authClient.send<boolean, string>('check_token_blacklist', token),
      );

      if (isBlacklisted) {
        throw new UnauthorizedException(
          'Sesi telah berakhir (Logout). Silakan login kembali.',
        );
      }
    } catch {
      // PERBAIKAN: Menghapus variabel (error) karena tidak digunakan
      throw new UnauthorizedException(
        'Gagal memvalidasi sesi. Silakan coba lagi.',
      );
    }

    const userProfile = await this.prisma.userProfile.findUnique({
      where: { accountId: payload.sub },
    });

    if (!userProfile) {
      throw new UnauthorizedException('Profil user tidak ditemukan di sistem');
    }

    return userProfile;
  }
}
