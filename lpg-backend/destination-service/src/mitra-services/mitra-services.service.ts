import { Injectable } from '@nestjs/common';
import { CreateMitraServiceDto } from './dto/create-mitra-service.dto';
import { UpdateMitraServiceDto } from './dto/update-mitra-service.dto';

@Injectable()
export class MitraServicesService {
  create(createMitraServiceDto: CreateMitraServiceDto) {
    return 'This action adds a new mitraService';
  }

  findAll() {
    return `This action returns all mitraServices`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mitraService`;
  }

  update(id: number, updateMitraServiceDto: UpdateMitraServiceDto) {
    return `This action updates a #${id} mitraService`;
  }

  remove(id: number) {
    return `This action removes a #${id} mitraService`;
  }
}
