import { Test, TestingModule } from '@nestjs/testing';
import { TestOffChainController } from './test-off-chain.controller';

describe('TestOffChainController', () => {
  let controller: TestOffChainController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestOffChainController],
    }).compile();

    controller = module.get<TestOffChainController>(TestOffChainController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
