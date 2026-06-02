import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMitraServiceDto } from './dto/create-mitra-service.dto';
import { UpdateMitraServiceDto } from './dto/update-mitra-service.dto';
import { Role } from 'src/common/enums/role.enum';
import { RequestUser } from 'src/destinations/destinations.service';
import { Prisma, ServiceType } from '@prisma/client';

@Injectable()
export class MitraServicesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateMitraServiceDto, user: RequestUser) {
    if (String(user.role) !== String(Role.MITRA)) {
      throw new ForbiddenException(
        'Hanya pengguna dengan role MITRA yang dapat membuat layanan.',
      );
    }

    const destination = await this.prisma.destination.findUnique({
      where: { id: dto.destinationId },
    });
    if (!destination) throw new NotFoundException('Destinasi tidak ditemukan');

    return this.prisma.mitraService.create({
      data: {
        ...dto,
        mitraId: user.id,
      },
    });
  }

  async findAll(destinationId?: string, type?: ServiceType) {
    const whereClause: Prisma.MitraServiceWhereInput = {
      ...(destinationId && { destinationId }),
      ...(type && { type }),
    };

    return this.prisma.mitraService.findMany({
      where: whereClause,
      include: {
        destination: { select: { name: true, location: true } },
        _count: { select: { reviews: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const service = await this.prisma.mitraService.findUnique({
      where: { id },
      include: { destination: true, reviews: true },
    });
    if (!service) throw new NotFoundException('Layanan Mitra tidak ditemukan');
    return service;
  }

  async update(id: string, dto: UpdateMitraServiceDto, user: RequestUser) {
    const service = await this.findOne(id);

    if (
      String(user.role) === String(Role.MITRA) &&
      service.mitraId !== user.id
    ) {
      throw new ForbiddenException(
        'Akses Ditolak: Anda hanya bisa mengedit layanan milik Anda sendiri.',
      );
    }

    return this.prisma.mitraService.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string, user: RequestUser) {
    const service = await this.findOne(id);

    if (
      String(user.role) === String(Role.MITRA) &&
      service.mitraId !== user.id
    ) {
      throw new ForbiddenException(
        'Akses Ditolak: Anda hanya bisa menghapus layanan milik Anda sendiri.',
      );
    }

    return this.prisma.mitraService.delete({ where: { id } });
  }
}
