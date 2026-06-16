import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import {
  CreateDestinationDto,
  UpdateDestinationDto,
} from './dto/destination.dto';

export interface RequestUser {
  id: string;
  email: string;
  role: string;
  regionId?: string | null;
}

@Injectable()
export class DestinationsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateDestinationDto, user: RequestUser) {
    if (user.role === 'ADMIN_WILAYAH' && dto.regionId !== user.regionId) {
      throw new ForbiddenException(
        'Akses Ditolak: Anda hanya dapat membuat destinasi di wilayah penugasan Anda.',
      );
    }

    return this.prisma.destination.create({ data: dto });
  }

  async findAll(regionIdFilter?: string) {
    const whereClause: Prisma.DestinationWhereInput = regionIdFilter
      ? { regionId: regionIdFilter }
      : {};

    return this.prisma.destination.findMany({
      where: whereClause,
      include: {
        _count: { select: { services: true, reviews: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const destination = await this.prisma.destination.findUnique({
      where: { id },
      include: { services: true, reviews: true },
    });

    if (!destination) throw new NotFoundException('Destinasi tidak ditemukan');
    return destination;
  }

  async update(id: string, dto: UpdateDestinationDto, user: RequestUser) {
    const destination = await this.findOne(id);

    if (
      user.role === 'ADMIN_WILAYAH' &&
      destination.regionId !== user.regionId
    ) {
      throw new ForbiddenException(
        'Akses Ditolak: Destinasi ini berada di luar wilayah Anda.',
      );
    }

    return this.prisma.destination.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string, user: RequestUser) {
    const destination = await this.findOne(id);

    if (
      user.role === 'ADMIN_WILAYAH' &&
      destination.regionId !== user.regionId
    ) {
      throw new ForbiddenException(
        'Akses Ditolak: Destinasi ini berada di luar wilayah Anda.',
      );
    }

    return this.prisma.destination.delete({ where: { id } });
  }
}
