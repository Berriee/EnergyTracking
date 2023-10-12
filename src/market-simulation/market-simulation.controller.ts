import { Controller, Get, Param } from '@nestjs/common';
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

    @Get('claim') 
    async claimCertificates() {
        return this.transferService.startClaimSimulation();
    }

    @Get('testClaim/:certId/:amount')
    async testClaim(@Param('certId') certId: number, @Param('amount') amount: number) {
        console.log(certId, amount)
        return this.transferService.testClaim(certId, amount);
    }

    @Get('getAll')
    async getAll() {
        return this.transferService.getAll();
    }
}
