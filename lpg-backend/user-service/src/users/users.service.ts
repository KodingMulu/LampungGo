import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  AssignRoleDto,
  CreateProfile,
  UpdateMitraStatusDto,
} from './dto/users.dto';
import { MitraStatus, Role, Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createProfile(data: CreateProfile) {
    const { accountId, email, name, role } = data;

    return this.prisma.userProfile.create({
      data: {
        accountId,
        email,
        name,
        role,
      },
    });
  }

  async getPendingMitra(adminRole: Role, adminRegionId?: string) {
    const whereClause: Prisma.UserProfileWhereInput = {
      role: Role.MITRA,
      mitraStatus: MitraStatus.PENDING,
    };

    if (adminRole === Role.ADMIN_WILAYAH) {
      if (!adminRegionId)
        throw new BadRequestException('Admin Wilayah tidak memiliki regionId');

      whereClause.regionId = adminRegionId;
    }

    return this.prisma.userProfile.findMany({
      where: whereClause,
    });
  }

  async updateMitraStatus(
    mitraId: string,
    data: UpdateMitraStatusDto,
    adminRole: Role,
    adminRegionId?: string,
  ) {
    const mitra = await this.prisma.userProfile.findUnique({
      where: { id: mitraId },
    });
    if (!mitra) throw new NotFoundException('Mitra tidak ditemukan');

    if (adminRole === Role.ADMIN_WILAYAH && mitra.regionId !== adminRegionId) {
      throw new BadRequestException(
        'Anda tidak memiliki akses memvalidasi mitra di luar wilayah Anda',
      );
    }

    return this.prisma.userProfile.update({
      where: {
        id: mitraId,
      },
      data: {
        mitraStatus: data.status,
      },
    });
  }

  async assignRole(userId: string, data: AssignRoleDto) {
    if (data.role === Role.ADMIN_WILAYAH && !data.regionId) {
      throw new BadRequestException('regionId wajib diisi untuk Admin Wilayah');
    }

    return this.prisma.userProfile.update({
      where: {
        id: userId,
      },
      data: {
        role: data.role,
        regionId: data.regionId || null,
      },
    });
  }
}
