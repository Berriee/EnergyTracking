import { Controller, Get, Param } from '@nestjs/common';
import { CertificateTracingService } from './certificate-tracing.service';
import { ICertificateRequestParams } from '../util/certificate-request-params.interface'


@Controller('certificates')
export class CertificateTracingController {
    constructor(private certificateTracingService: CertificateTracingService) {}

    @Get(':month/:year/:adress')
    async getCertificateInformation(@Param('month') month: number, @Param('year') year: number, @Param('adress') adress: string): Promise<any> {
        
        
        const params: ICertificateRequestParams = {
            month: month,
            year: year,
            address: adress
        }
        return this.certificateTracingService.getCertificates(params);
    }

    @Get('getIssuanceDates') 
    async getIssuanceDates(): Promise<any> {
        return this.certificateTracingService.getIssuanceDates();
    }
}