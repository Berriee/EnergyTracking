import { Injectable } from '@nestjs/common';
import { OffChainCertificateService } from '@energyweb/origin-247-certificate';
import { LeftoverEnergyValueService } from '../leftover-energy-value/leftover-energy-value.service';
import { ICertificateRequestParams } from '../util/certificate-request-params.interface'
import { IIssuanceDate } from '../util/issuance-dates.interface'

@Injectable()
export class CertificateTracingService {
    constructor(
        private offChainCertificateService: OffChainCertificateService,
        private leftoverEnergyValueService: LeftoverEnergyValueService,
    ) {}
    
    
    public async offchainCert(): Promise<any>{
        /* this.offChainCertificateService.claim({
            certificateId: 1,
            claimData: 'I',
            forAddress: 
            energyValue:
    }) */
        return await this.offChainCertificateService.getAll();
    }
    public async getCertificates(params: ICertificateRequestParams): Promise<any>{
        const userCertificatesCurrent = [];

        const userCertificatesPrevious = [];

        const requestedDate = new Date(params.year, params.month - 1, 1); // Subtract 1 from month since it is zero-indexed
        const certificates = await this.offChainCertificateService.getAll();

        const prevMonth = requestedDate.getMonth() === 0 ? 11 : requestedDate.getMonth() - 1;
        const prevYear = requestedDate.getMonth() === 0 ? requestedDate.getFullYear() - 1 : requestedDate.getFullYear();
        
        certificates.map((certificate) => {
            const certificateGenerationDate = new Date(certificate.generationEndTime * 1000)
                    
            if(certificate.owners[params.address] ===  undefined){
                return
            }

            //TODO Temporarily removed, add back in when done
            /* if (certificate.isSynced == false) {
                return
            } */

            if(this.checkCertificateMonthAndYear(certificateGenerationDate, requestedDate)) { 
                userCertificatesCurrent.push(certificate)
            }

            if(requestedDate.getMonth() === prevMonth && certificateGenerationDate.getFullYear() === prevYear) {
                userCertificatesPrevious.push(certificate)
            }
        })

        const leftoverEnergyValuesCurrent = await this.leftoverEnergyValueService.findByAddressAndDate({
            address: params.address,
            month: requestedDate.getMonth(),
            year: requestedDate.getFullYear(),
        } as ICertificateRequestParams);
        const leftoverEnergyValuesPrevious = await this.leftoverEnergyValueService.findByAddressAndDate({
            address: params.address,
            month: prevMonth,
            year: prevYear,
        } as ICertificateRequestParams);

        return {
            currentCerts: userCertificatesCurrent,
            currentLeftoverEnergyValues: leftoverEnergyValuesCurrent,
            previousCerts: userCertificatesPrevious,
            previousLeftoverEnergyValues: leftoverEnergyValuesPrevious
        }
    }

    private checkCertificateMonthAndYear(certificateGenerationDate: Date, paramsDate: Date): boolean {
        if(certificateGenerationDate.getMonth() === paramsDate.getMonth()) { 
            if(certificateGenerationDate.getFullYear() === paramsDate.getFullYear()) {
                return true;
            }
        }
        return false;
    }
    
    public async getIssuanceDates(): Promise<any> {
        const certificates = await this.offChainCertificateService.getAll();
        const issuanceDates: IIssuanceDate[] = [];

        certificates.forEach((certificate) => {
            const date = new Date(certificate.generationEndTime * 1000);
            const monthYearString = date.toLocaleString('default', { month: 'long', year: 'numeric' });
            const monthYearDate = new Date(date.getFullYear(), date.getMonth(), 1);
            if (!issuanceDates.some((issuanceDate) => issuanceDate.monthYearString === monthYearString)) {
                issuanceDates.push({
                    monthYearDate: monthYearDate,
                    monthYearString: monthYearString,
                });
            }
        });

        return issuanceDates.reverse();
    }
}