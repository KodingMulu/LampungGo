import { Test, TestingModule } from '@nestjs/testing';
import { MitraServicesController } from './mitra-services.controller';
import { MitraServicesService } from './mitra-services.service';

describe('MitraServicesController', () => {
  let controller: MitraServicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MitraServicesController],
      providers: [MitraServicesService],
    }).compile();

    controller = module.get<MitraServicesController>(MitraServicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
