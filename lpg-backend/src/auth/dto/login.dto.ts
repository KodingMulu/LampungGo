import { Role } from '@prisma/client';

export class LoginDto {
  email!: string;
  password!: string;
  role?: Role;
}
