import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ForgotPassword,
  LoginDto,
  RegisterDto,
  ResetPasswordDto,
  VerifyDto,
  VerifyResetOtpDto,
} from './dto/auth.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { JwtPayload } from './types/auth-payload.type';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() data: RegisterDto) {
    return this.authService.register(data);
  }

  @Post('verify')
  async verifyOtp(@Body() data: VerifyDto) {
    return this.authService.verifyOtp(data);
  }

  @Post('login')
  login(@Body() data: LoginDto) {
    return this.authService.login(data);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() data: ForgotPassword) {
    return this.authService.forgotPassword(data);
  }

  @Post('verify-reset-otp')
  async verifyResetOtp(@Body() data: VerifyResetOtpDto) {
    return this.authService.verifyResetOtp(data);
  }

  @Post('reset-password')
  async resetPassword(@Body() data: ResetPasswordDto) {
    return this.authService.resetPassword(data);
  }

  @MessagePattern({ cmd: 'get_user_by_id' })
  async getUserById(@Payload() id: string) {
    return this.authService.findById(id);
  }

  @MessagePattern({ cmd: 'validate_token' })
  async validateToken(@Payload() token: string): Promise<JwtPayload | null> {
    return this.authService.validateToken(token);
  }
}
