import { Controller, Get } from '@nestjs/common';
import { MarketSimulationService } from './market-simulation.service';

@Controller('market-simulation')
export class MarketSimulationController {
    constructor(private transferService: MarketSimulationService) {}
    
    @Get('start')
    async startSimulation() {
        return this.transferService.startSimulation();
    }

    @Get('synchronize') 
    async synchronize() {
        return this.transferService.synchronize();
    }

    @Get('test') 
    async claimTesting() {
        return this.transferService.claimTesting();
    }

    /* @Get('claim') 
    async claimCert() {
        return this.transferService.claimCert();
    } */
}
