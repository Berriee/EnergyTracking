import { Injectable } from '@nestjs/common';
import { ICertificateReadModel, OffChainCertificateService } from '@energyweb/origin-247-certificate';
import { BlockchainSynchronizeService } from '@energyweb/origin-247-certificate';

@Injectable()
export class TestOffChainService {
    constructor(
        private offChainCertificateService: OffChainCertificateService,
        private blockchainSynchronizeService: BlockchainSynchronizeService,
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
    public async getCertificates(params: Object): Promise<any>{
        const userCertificatesCurrent = [];
        const userCertificatesPrevious = [];

        const paramsDate = new Date(params['year'], params['month'] - 1, 1); // Subtract 1 from month since it is zero-indexed


        const certificates = await this.checkForNewCertificates();

        certificates.map((certificate) => {
            const certificateGenerationDate = new Date(certificate.generationEndTime * 1000)
                    
            if(certificate.owners[params['did']] ==  undefined){
                return
            }

            if (certificate.isSynced == false) {
                return
            }

            if(this.checkCertificateMonthAndYear(certificateGenerationDate, paramsDate)) { 
                    userCertificatesCurrent.push(certificate)
            }

            if(paramsDate.getMonth() == 0) {
                if(certificateGenerationDate.getMonth() == 11) {
                    if(certificateGenerationDate.getFullYear() == paramsDate.getFullYear() - 1) {
                        userCertificatesPrevious.push(certificate)
                    }
                }
            } else if(this.checkCertificateMonthAndYear(certificateGenerationDate, new Date(paramsDate.getFullYear(), paramsDate.getMonth() - 1, 1))) {
                userCertificatesPrevious.push(certificate)
            }

        })
        return {
            currentCerts: userCertificatesCurrent,
            previousCerts: userCertificatesPrevious
        }
    }

    private checkCertificateMonthAndYear(certificateGenerationDate: Date, paramsDate: Date): boolean {
        if(certificateGenerationDate.getMonth() == paramsDate.getMonth()) { 
            if(certificateGenerationDate.getFullYear() == paramsDate.getFullYear()) {
                return true;
            }
        }
        return false;
    }
    
    public async getIssuanceDates(): Promise<any> {
        const certificates = await this.checkForNewCertificates();
        console.log(certificates);
        const issuanceDates = [];

        certificates.forEach((certificate) => {
            const date = new Date(certificate.generationEndTime * 1000);
            const monthYearString = date.toLocaleString('default', { month: 'long', year: 'numeric' });
            const monthYearDate = new Date(date.getFullYear(), date.getMonth(), 1);
            if (!issuanceDates.some((issuanceDate) => issuanceDate.monthYearString === monthYearString)) {
                issuanceDates.push({ monthYearString, monthYearDate });
            }
        });

        return issuanceDates.reverse();
    }

    // Check if there are new certificates on the blockchain and add them to the allCertificates array
    private async checkForNewCertificates(): Promise<ICertificateReadModel<any>[]> {
        const certificates = await this.offChainCertificateService.getAll();
        return certificates;
    }
}