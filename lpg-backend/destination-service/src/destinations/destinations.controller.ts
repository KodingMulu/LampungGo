import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Request,
} from '@nestjs/common';
import { DestinationsService } from './destinations.service';
import { Roles } from 'src/common/guards/roles.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import {
  CreateDestinationDto,
  UpdateDestinationDto,
} from './dto/destination.dto';
import { Role } from '../common/enums/role.enum';

export interface RequestUser {
  id: string;
  email: string;
  role: Role;
  regionId?: string;
}

@Controller('destinations')
export class DestinationsController {
  constructor(private readonly destinationsService: DestinationsService) {}

  @Roles(Role.SUPER_ADMIN, Role.ADMIN_WILAYAH)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(
    @Body() createDestinationDto: CreateDestinationDto,
    @Request() req: { user: RequestUser },
  ) {
    return this.destinationsService.create(createDestinationDto, req.user);
  }

  @Get()
  findAll(@Query('regionId') regionId?: string) {
    return this.destinationsService.findAll(regionId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.destinationsService.findOne(id);
  }

  @Roles(Role.SUPER_ADMIN, Role.ADMIN_WILAYAH)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDestinationDto: UpdateDestinationDto,
    @Request() req: { user: RequestUser },
  ) {
    return this.destinationsService.update(id, updateDestinationDto, req.user);
  }

  @Roles(Role.SUPER_ADMIN, Role.ADMIN_WILAYAH)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: { user: RequestUser }) {
    return this.destinationsService.remove(id, req.user);
  }
}
