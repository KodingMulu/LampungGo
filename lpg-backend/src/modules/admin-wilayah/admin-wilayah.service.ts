/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Status, Destination, Report } from '@prisma/client';
import { adminWilayah } from './dto/admin-wilayah.dto';

@Injectable()
export class AdminWilayahService {
  constructor(private readonly prisma: PrismaService) {}

  async createDestination(
    userId: string,
    data: adminWilayah,
  ): Promise<Destination> {
    return await this.prisma.destination.create({
      data: {
        name: data.name,
        category: data.category,
        latitude: data.latitude,
        longitude: data.longitude,
        priceEstimate: data.priceEstimate,
        description: data.description,
        createdBy: userId,
        status: Status.APPROVED,
      },
    });
  }

  async getReports(): Promise<Report[]> {
    const reports = await this.prisma.report.findMany({
      where: { status: Status.PENDING },
      include: { user: { select: { name: true } } },
    });
    return reports as Report[];
  }

  async validateReport(reportId: string): Promise<Destination> {
    const report = await this.prisma.report.findUnique({
      where: { id: reportId },
    });

    if (!report) {
      throw new NotFoundException('Laporan tidak ditemukan');
    }

    return await this.prisma.$transaction(async (tx) => {
      // Buat destinasi dari data laporan
      const destination = await tx.destination.create({
        data: {
          name: report.destinationName,
          description: report.description,
          latitude: report.latitude,
          longitude: report.longitude,
          category: 'Uncategorized',
          createdBy: report.userId,
          status: Status.APPROVED,
        },
      });

      // Update status laporan
      await tx.report.update({
        where: { id: reportId },
        data: { status: Status.APPROVED },
      });

      return destination as Destination;
    });
  }
}
