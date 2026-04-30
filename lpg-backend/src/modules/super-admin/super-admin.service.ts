import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Destination, Role, Status, MitraProfile } from '@prisma/client';

@Injectable()
export class SuperAdminService {
  constructor(private readonly prisma: PrismaService) {}

  async getPendingMitra(): Promise<MitraProfile[]> {
    return await this.prisma.mitraProfile.findMany({
      where: { isVerified: false },
      include: { user: { select: { name: true, email: true } } },
    });
  }

  async approveMitra(mitraId: string): Promise<{ message: string }> {
    return await this.prisma.$transaction(async (tx) => {
      const mitra = await tx.mitraProfile.update({
        where: { id: mitraId },
        data: { isVerified: true },
      });
      await tx.user.update({
        where: { id: mitra.userId },
        data: { role: Role.MITRA },
      });
      return { message: 'Mitra berhasil disetujui' };
    });
  }

  async getPendingDestinations(): Promise<Destination[]> {
    return await this.prisma.destination.findMany({
      where: { status: Status.PENDING },
      include: { creator: { select: { name: true } } },
    });
  }

  async approveDestination(id: string): Promise<Destination> {
    return await this.prisma.destination.update({
      where: { id },
      data: { status: Status.APPROVED },
    });
  }
}
