import { Test, TestingModule } from '@nestjs/testing';
import { MarketSimulationController } from './market-simulation.controller';

describe('MarketSimulationController', () => {
  let controller: MarketSimulationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MarketSimulationController],
    }).compile();

    controller = module.get<MarketSimulationController>(MarketSimulationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
