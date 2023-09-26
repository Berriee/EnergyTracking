import { Test, TestingModule } from '@nestjs/testing';
import { TestOffChainService } from './test-off-chain.service';

describe('TestOffChainService', () => {
  let service: TestOffChainService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestOffChainService],
    }).compile();

    service = module.get<TestOffChainService>(TestOffChainService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
