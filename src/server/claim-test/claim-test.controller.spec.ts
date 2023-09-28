import { Test, TestingModule } from '@nestjs/testing';
import { ClaimTestController } from './claim-test.controller';

describe('ClaimTestController', () => {
  let controller: ClaimTestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClaimTestController],
    }).compile();

    controller = module.get<ClaimTestController>(ClaimTestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
