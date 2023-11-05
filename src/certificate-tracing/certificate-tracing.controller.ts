import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { CertificateTracingService } from './certificate-tracing.service';
import { ICertificateRequestParams } from '../util/certificate-request-params.interface'
import { AuthGuardService } from '../auth-guard/auth-guard.service';


@Controller('certificates')
export class CertificateTracingController {
    constructor(private certificateTracingService: CertificateTracingService) {}

    // This endpoint is used to get the certificates of a user
    @Get(':month/:year/:address')
    @UseGuards(AuthGuardService)
    async getCertificateInformation(@Param('month') month: number, @Param('year') year: number, @Param('address') address: string): Promise<any> {
        
        
        const params: ICertificateRequestParams = {
            month: month,
            year: year,
            address: address
        }
        return this.certificateTracingService.getCertificates(params);
    }

    // This endpoint is used to get the issuance dates of a user that will be displayed in the dropdown menu
    @Get('getIssuanceDates/:address') 
    @UseGuards(AuthGuardService)
    async getIssuanceDates(@Param('address') address: string): Promise<any> {
        return this.certificateTracingService.getIssuanceDates(address);
    }
}