import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { MitraServicesService } from './mitra-services.service';
import { CreateMitraServiceDto } from './dto/create-mitra-service.dto';
import { UpdateMitraServiceDto } from './dto/update-mitra-service.dto';
import { Roles } from '../common/guards/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { Role } from '../common/enums/role.enum';
import { RequestUser } from 'src/destinations/destinations.service';
import { ServiceType } from '@prisma/client';

@Controller('mitra-services')
export class MitraServicesController {
  constructor(private readonly mitraServicesService: MitraServicesService) {}

  @Roles(Role.MITRA) // Hanya Mitra yang bisa tambah jualan
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('cms/mitra-services')
  create(
    @Body() dto: CreateMitraServiceDto,
    @Request() req: { user: RequestUser },
  ) {
    return this.mitraServicesService.create(dto, req.user);
  }

  @Roles(Role.MITRA, Role.ADMIN_WILAYAH, Role.SUPER_ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('cms/mitra-services/:id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateMitraServiceDto,
    @Request() req: { user: RequestUser },
  ) {
    return this.mitraServicesService.update(id, dto, req.user);
  }

  @Roles(Role.MITRA, Role.ADMIN_WILAYAH, Role.SUPER_ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('cms/mitra-services/:id')
  remove(@Param('id') id: string, @Request() req: { user: RequestUser }) {
    return this.mitraServicesService.remove(id, req.user);
  }

  @Get('mitra-services')
  findAll(
    @Query('destinationId') destinationId?: string,
    @Query('type') type?: ServiceType, // <-- UBAH STRING MENJADI ServiceType
  ) {
    return this.mitraServicesService.findAll(destinationId, type);
  }

  @Get('mitra-services/:id')
  findOne(@Param('id') id: string) {
    return this.mitraServicesService.findOne(id);
  }
}
