import { Controller, Get, Param, Post } from '@nestjs/common';
import { MarketSimulationService } from './market-simulation.service';
import { LeftoverEnergyValueService } from '../leftover-energy-value/leftover-energy-value.service';
import { LeftoverEnergyValue } from '../leftover-energy-value/leftover-energy-value.entity';


@Controller('market-simulation')
export class MarketSimulationController {
    constructor(
        private transferService: MarketSimulationService,
        private leftoverEnergyValueService: LeftoverEnergyValueService
        ) {}
    

    @Get('issue/:receiverAdress/:deviceAmount')
    async startSimulation(@Param('deviceAmount') deviceAmount: number) {
        return this.transferService.startIssueanceSimulation(deviceAmount);
    }

    @Get('claim/:receiverAdress') 
    async claimCertificates(@Param('receiverAdress') receiverAdress: string) {
        return this.transferService.startClaimSimulation(receiverAdress);
    }

    @Get('synchronize') 
    async synchronize() {
        return this.transferService.synchronize();
    }
    

    /* @Get('testClaim/:certId/:amount')
    async testClaim(@Param('certId') certId: number, @Param('amount') amount: number) {
        console.log(certId, amount)
        return this.transferService.testClaim(certId, amount);
    } */

    @Get('getAll')
    async getAll() {
        return this.transferService.getAll();
    }

    @Get('test')
    async test() {
        return this.leftoverEnergyValueService.findAll();
    }

    @Post('test/:date/:leftoverEnergyValue')
    async testpost(@Param('date') date: string, @Param('leftoverEnergyValue') leftoverEnergyValue: number) {
        console.log(new Date(date), leftoverEnergyValue)
        const stuff: LeftoverEnergyValue = {
            userAdress: '0xb923e9d65104c7895B3DA5e95FB1A601E02Cf3F6',
            date: new Date(date),
            energyValue: leftoverEnergyValue,
        }
        return this.leftoverEnergyValueService.createEntry(stuff);
    }
}
