import { Injectable } from '@nestjs/common';
import { auth_api } from '../common/axios/auth.axios';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  async login(loginDto: LoginDto): Promise<unknown> {
    const response = await auth_api.post('/auth/login', loginDto);
    return response.data;
  }

  async getProfile(token: string | undefined): Promise<unknown> {
    const response = await auth_api.get('/auth/profile', {
      headers: {
        ...(token ? { Authorization: token } : {}),
      },
    });
    return response.data;
  }
}
