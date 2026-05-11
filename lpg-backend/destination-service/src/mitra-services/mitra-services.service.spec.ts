import { Test, TestingModule } from '@nestjs/testing';
import { MitraServicesService } from './mitra-services.service';

describe('MitraServicesService', () => {
  let service: MitraServicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MitraServicesService],
    }).compile();

    service = module.get<MitraServicesService>(MitraServicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
