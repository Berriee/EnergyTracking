import { Test, TestingModule } from '@nestjs/testing';
import { MarketSimulationService } from './market-simulation.service';

describe('MarketSimulationService', () => {
  let service: MarketSimulationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MarketSimulationService],
    }).compile();

    service = module.get<MarketSimulationService>(MarketSimulationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
