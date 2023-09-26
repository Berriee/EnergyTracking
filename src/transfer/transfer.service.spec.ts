import { Test, TestingModule } from '@nestjs/testing';
import { SimulationTransferService } from './transfer.service';

describe('TransferService', () => {
  let service: SimulationTransferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SimulationTransferService],
    }).compile();

    service = module.get<SimulationTransferService>(SimulationTransferService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
