import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { JwtPayload } from './types/auth-payload.type';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() data: RegisterDto) {
    return this.authService.register(data);
  }

  @Post('login')
  login(@Body() data: LoginDto) {
    return this.authService.login(data);
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
