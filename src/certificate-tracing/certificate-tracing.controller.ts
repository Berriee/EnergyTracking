import { Controller, Get, Param } from '@nestjs/common';
import { CertificateTracingService } from './certificate-tracing.service';

@Controller('certificates')
export class CertificateTracingController {
    constructor(private certificateTracingService: CertificateTracingService) {}

    @Get(':month/:year/:adress')
    async getCertificateInformation(@Param('month') month: number, @Param('year') year: number, @Param('adress') adress: string): Promise<any> {
        const params = {
            month: month,
            year: year,
            adress: adress
        }
        return this.certificateTracingService.getCertificates(params);
    }

    @Get('getIssuanceDates') 
    async getIssuanceDates(): Promise<any> {
        return this.certificateTracingService.getIssuanceDates();
    }
}