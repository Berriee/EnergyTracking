import { Test, TestingModule } from '@nestjs/testing';
import { RegisterDeviceController } from './register-device.controller';

describe('RegisterDeviceController', () => {
  let controller: RegisterDeviceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegisterDeviceController],
    }).compile();

    controller = module.get<RegisterDeviceController>(RegisterDeviceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
