import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
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
  @IsNotEmpty({ message: 'Nama tidak boleh kosong' })
  name!: string;

  @IsEmail({}, { message: 'Format email tidak valid' })
  @IsNotEmpty({ message: 'Email tidak boleh kosong' })
  email!: string;

  @IsString()
  @IsNotEmpty({ message: 'Password tidak boleh kosong' })
  @Length(6, 20, { message: 'Password harus antara 6 hingga 20 karakter' })
  password!: string;

  @IsString()
  @IsOptional()
  phone?: string;
}

export class VerifyDto {
  @IsEmail({}, { message: 'Format email tidak valid' })
  @IsNotEmpty({ message: 'Email tidak boleh kosong' })
  email!: string;

  @IsString()
  @IsNotEmpty({ message: 'Kode OTP tidak boleh kosong' })
  @Length(6, 6, { message: 'Kode OTP harus 4 digit' })
  otpCode: string;
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
