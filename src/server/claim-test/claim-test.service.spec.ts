import { Test, TestingModule } from '@nestjs/testing';
import { ClaimTestService } from './claim-test.service';

describe('ClaimTestService', () => {
  let service: ClaimTestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClaimTestService],
    }).compile();

    service = module.get<ClaimTestService>(ClaimTestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
