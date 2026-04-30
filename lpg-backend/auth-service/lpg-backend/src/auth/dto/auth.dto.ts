/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsNotEmpty()
  password!: string;
}

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Password Minimal 6 Karakter' })
  password!: string;

  @IsString()
  @IsOptional()
  phone?: string;
}

export class VerifyDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  code: string;
}

export class ForgotPassword {
  @IsEmail()
  @IsNotEmpty()
  email!: string;
}

export class ResetPassword {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  code: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Password Minimal 6 Karakter' })
  newPass!: string;
}
