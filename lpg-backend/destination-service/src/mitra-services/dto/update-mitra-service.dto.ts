import { PartialType } from '@nestjs/mapped-types';
import { CreateMitraServiceDto } from './create-mitra-service.dto';

export class UpdateMitraServiceDto extends PartialType(CreateMitraServiceDto) {}
