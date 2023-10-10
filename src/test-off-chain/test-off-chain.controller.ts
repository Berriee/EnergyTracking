import { Controller, Get, Param } from '@nestjs/common';
import { TestOffChainService } from './test-off-chain.service';

@Controller('certificates')
export class TestOffChainController {
    constructor(private offChainService: TestOffChainService) {}

    @Get()
    async getAllQuestionmark(): Promise<any> {
        return this.offChainService.offchainCert()
    }

    @Get(':month/:year/:did')
    async getCertificateInformation(@Param('month') month: number, @Param('year') year: number, @Param('did') did: string): Promise<any> {
        console.log(month, year, did)
        const params = {
            month: month,
            year: year,
            did: did
        }
        return this.offChainService.getCertificates(params);
    }

    @Get('getIssuanceDates') 
    async getIssuanceDates(): Promise<any> {
        return this.offChainService.getIssuanceDates();
    }
}