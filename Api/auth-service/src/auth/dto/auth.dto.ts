import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Format email tidak valid' })
  @IsNotEmpty({ message: 'Email tidak boleh kosong' })
  email!: string;

  @IsString()
  @IsNotEmpty({ message: 'Password tidak boleh kosong' })
  @Length(6, 20, { message: 'Password harus antara 6 hingga 20 karakter' })
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
  @IsEmail({}, { message: 'Format email tidak valid' })
  @IsNotEmpty({ message: 'Email tidak boleh kosong' })
  email: string;
}

export class VerifyResetOtpDto {
  @IsEmail({}, { message: 'Format email tidak valid' })
  @IsNotEmpty({ message: 'Email tidak boleh kosong' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Kode OTP tidak boleh kosong' })
  @Length(6, 6, { message: 'Kode OTP harus 6 digit' })
  otpCode: string;
}

export class ResetPasswordDto {
  @IsEmail({}, { message: 'Format email tidak valid' })
  @IsNotEmpty({ message: 'Email tidak boleh kosong' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Reset token tidak boleh kosong' })
  resetToken: string;

  @IsString()
  @IsNotEmpty({ message: 'Password baru tidak boleh kosong' })
  @Length(6, 20, { message: 'Password baru harus antara 6 hingga 20 karakter' })
  newPassword: string;
}
