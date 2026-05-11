import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MitraServicesService } from './mitra-services.service';
import { CreateMitraServiceDto } from './dto/create-mitra-service.dto';
import { UpdateMitraServiceDto } from './dto/update-mitra-service.dto';

@Controller('mitra-services')
export class MitraServicesController {
  constructor(private readonly mitraServicesService: MitraServicesService) {}

  @Post()
  create(@Body() createMitraServiceDto: CreateMitraServiceDto) {
    return this.mitraServicesService.create(createMitraServiceDto);
  }

  @Get()
  findAll() {
    return this.mitraServicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mitraServicesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMitraServiceDto: UpdateMitraServiceDto) {
    return this.mitraServicesService.update(+id, updateMitraServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mitraServicesService.remove(+id);
  }
}
