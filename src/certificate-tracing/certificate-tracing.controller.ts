import { Controller, Get, Param } from '@nestjs/common';
import { CertificateTracingService } from './certificate-tracing.service';
import { ICertificateRequestParams } from '../util/certificate-request-params.interface'


@Controller('certificates')
export class CertificateTracingController {
    constructor(private certificateTracingService: CertificateTracingService) {}

    @Get(':month/:year/:address')
    async getCertificateInformation(@Param('month') month: number, @Param('year') year: number, @Param('address') address: string): Promise<any> {
        
        
        const params: ICertificateRequestParams = {
            month: month,
            year: year,
            address: address
        }
        return this.certificateTracingService.getCertificates(params);
    }

    @Get('getIssuanceDates/:address') 
    async getIssuanceDates(@Param('address') address: string): Promise<any> {
        return this.certificateTracingService.getIssuanceDates(address);
    }
}