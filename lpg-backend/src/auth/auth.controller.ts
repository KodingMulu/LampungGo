import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import type { AuthRequest } from './types/auth-request.type';
import {
  ForgotPassword,
  LoginDto,
  RegisterDto,
  ResetPassword,
  VerifyDto,
} from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @Post('verify')
  verify(@Body() body: VerifyDto) {
    return this.authService.verify(body);
  }

  @Post('login')
  login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req: AuthRequest) {
    return req.user;
  }

  @Post('forgot-password')
  forgotPassword(@Body() body: ForgotPassword) {
    return this.authService.forgotPassword(body);
  }

  @Post('reset-password')
  resetPassword(@Body() body: ResetPassword) {
    return this.authService.resetPassword(body);
  }
}
