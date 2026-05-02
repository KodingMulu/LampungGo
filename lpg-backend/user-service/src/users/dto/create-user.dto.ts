import { MitraStatus, Role } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString, IsOptional } from 'class-validator';

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
