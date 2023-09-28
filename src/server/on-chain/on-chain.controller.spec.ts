import { Test, TestingModule } from '@nestjs/testing';
import { OnChainController } from './on-chain.controller';

describe('OnChainController', () => {
  let controller: OnChainController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OnChainController],
    }).compile();

    controller = module.get<OnChainController>(OnChainController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
