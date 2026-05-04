import {
  Controller,
  Get,
  Patch,
  Body,
  Param,
  UseGuards,
  Request,
  Logger,
} from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { Role, UserProfile } from '@prisma/client';
import { Roles } from '../common/guards/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { UpdateMitraStatusDto, AssignRoleDto } from './dto/users.dto';

interface CreateProfilePayload {
  accountId: string;
  email: string;
  name: string;
  role: Role;
}

interface RequestWithUser extends Request {
  user: UserProfile;
}

@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private readonly usersService: UsersService) {}

  @EventPattern('account_created')
  async handleAccountCreated(@Payload() data: CreateProfilePayload) {
    this.logger.log(`Membuat UserProfile untuk akun: ${data.email}`);
    await this.usersService.createProfile(data);
  }

  @Roles(Role.SUPER_ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('dashboard/stats')
  getDashboardStats() {
    return this.usersService.getDashboardStats();
  }

  @Roles(Role.SUPER_ADMIN, Role.ADMIN_WILAYAH)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('mitra/pending')
  getPendingMitra(@Request() req: RequestWithUser) {
    const adminRole = req.user.role;
    const adminRegionId = req.user.regionId ?? undefined;

    return this.usersService.getPendingMitra(adminRole, adminRegionId);
  }

  @Roles(Role.SUPER_ADMIN, Role.ADMIN_WILAYAH)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('mitra/:id/validate')
  validateMitra(
    @Param('id') id: string,
    @Body() dto: UpdateMitraStatusDto,
    @Request() req: RequestWithUser,
  ) {
    const adminRole = req.user.role;
    const adminRegionId = req.user.regionId ?? undefined;

    return this.usersService.updateMitraStatus(
      id,
      dto,
      adminRole,
      adminRegionId,
    );
  }

  @Roles(Role.SUPER_ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id/assign-role')
  assignRole(@Param('id') id: string, @Body() dto: AssignRoleDto) {
    return this.usersService.assignRole(id, dto);
  }
}
