import { Test, TestingModule } from '@nestjs/testing';
import { RegisterDeviceService } from './register-device.service';

describe('RegisterDeviceService', () => {
  let service: RegisterDeviceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegisterDeviceService],
    }).compile();

    service = module.get<RegisterDeviceService>(RegisterDeviceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
