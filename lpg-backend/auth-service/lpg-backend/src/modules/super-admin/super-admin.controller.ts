import { Controller, Get, Patch, Param, UseGuards } from '@nestjs/common';
import { SuperAdminService } from './super-admin.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('cms/super-admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.SUPER_ADMIN)
export class SuperAdminController {
  constructor(private readonly adminService: SuperAdminService) {}

  @Get('mitra/pending')
  listPendingMitra() {
    return this.adminService.getPendingMitra();
  }

  @Patch('mitra/:id/approve')
  accMitra(@Param('id') id: string) {
    return this.adminService.approveMitra(id);
  }

  @Get('destinations/pending')
  listPendingDest() {
    return this.adminService.getPendingDestinations();
  }

  @Patch('destinations/:id/approve')
  accDest(@Param('id') id: string) {
    return this.adminService.approveDestination(id);
  }
}
