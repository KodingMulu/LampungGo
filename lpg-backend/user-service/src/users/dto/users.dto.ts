import { MitraStatus, Role } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEmail,
} from 'class-validator';

export class CreateProfile {
  @IsString()
  accountId: string;

  @IsEmail({}, { message: 'Format email tidak valid' })
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(Role)
  @IsNotEmpty()
  role: Role;
}

export class UpdateMitraStatusDto {
  @IsEnum(MitraStatus)
  @IsNotEmpty()
  status: MitraStatus;
}

export class AssignRoleDto {
  @IsEnum(Role)
  @IsNotEmpty()
  role: Role;

  @IsString()
  @IsOptional()
  regionId?: string;
}
