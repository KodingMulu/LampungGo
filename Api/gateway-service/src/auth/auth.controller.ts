import { Controller, Post, Body, Req, Get } from '@nestjs/common';
import type { Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth') // Menghasilkan endpoint: host/api/auth
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<unknown> {
    return this.authService.login(loginDto);
  }

  @Get('profile')
  async getProfile(@Req() req: Request): Promise<unknown> {
    return this.authService.getProfile(req.headers.authorization);
  }
}
