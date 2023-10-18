import { Controller, Get, Param } from '@nestjs/common';
import { TestOffChainService } from './test-off-chain.service';

@Controller('certificates')
export class TestOffChainController {
    constructor(private offChainService: TestOffChainService) {}

    @Get(':month/:year/:adress')
    async getCertificateInformation(@Param('month') month: number, @Param('year') year: number, @Param('adress') adress: string): Promise<any> {
        const params = {
            month: month,
            year: year,
            adress: adress
        }
        return this.offChainService.getCertificates(params);
    }

    @Get('getIssuanceDates') 
    async getIssuanceDates(): Promise<any> {
        return this.offChainService.getIssuanceDates();
    }
}