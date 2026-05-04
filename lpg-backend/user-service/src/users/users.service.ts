import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  AssignRoleDto,
  CreateProfile,
  CreateRegionDto,
  UpdateMitraStatusDto,
  UpdateRegionDto,
} from './dto/users.dto';
import { MitraStatus, Role, Prisma } from '@prisma/client';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    @Inject('AUTH_SERVICE') private authClient: ClientProxy,
  ) {}

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

  /**
   * Feature Super Admin
   */
  async getDashboardStats() {
    const [
      totalUsers,
      totalMitra,
      pendingMitra,
      totalAdminWilayah,
      totalRegions,
    ] = await Promise.all([
      this.prisma.userProfile.count({ where: { role: Role.USER } }),
      this.prisma.userProfile.count({ where: { role: Role.MITRA } }),
      this.prisma.userProfile.count({
        where: { role: Role.MITRA, mitraStatus: MitraStatus.PENDING },
      }),
      this.prisma.userProfile.count({ where: { role: Role.ADMIN_WILAYAH } }),
      this.prisma.region.count(),
    ]);

    return {
      totalUsers,
      totalMitra,
      pendingMitra,
      totalAdminWilayah,
      totalRegions,
    };
  }

  async createRegion(dto: CreateRegionDto) {
    const existing = await this.prisma.region.findUnique({
      where: { name: dto.name },
    });
    if (existing)
      throw new BadRequestException('Wilayah dengan nama ini sudah ada');
    return this.prisma.region.create({ data: dto });
  }

  async getAllRegions() {
    return this.prisma.region.findMany({
      include: { _count: { select: { admins: true } } },
    });
  }

  async updateRegion(id: string, dto: UpdateRegionDto) {
    const region = await this.prisma.region.findUnique({ where: { id } });
    if (!region) throw new NotFoundException('Wilayah tidak ditemukan');
    return this.prisma.region.update({ where: { id }, data: dto });
  }

  async deleteRegion(id: string) {
    const adminCount = await this.prisma.userProfile.count({
      where: { regionId: id },
    });
    if (adminCount > 0)
      throw new BadRequestException(
        'Gagal: Masih ada Admin Wilayah yang terikat di wilayah ini.',
      );
    return this.prisma.region.delete({ where: { id } });
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

    const updateUsers = await this.prisma.userProfile.update({
      where: {
        id: userId,
      },
      data: {
        role: data.role,
        regionId: data.regionId || null,
      },
    });

    this.authClient.emit('role_updated', {
      accountId: updateUsers.accountId,
      role: updateUsers.role,
    });

    return updateUsers;
  }
}
