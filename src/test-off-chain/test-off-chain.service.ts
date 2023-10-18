import { Injectable } from '@nestjs/common';
import { ICertificateReadModel, OffChainCertificateService } from '@energyweb/origin-247-certificate';
import { BlockchainSynchronizeService } from '@energyweb/origin-247-certificate';
import { LeftoverEnergyValueService } from '../leftover-energy-value/leftover-energy-value.service';
import { OnChainCertificateFacade } from '@energyweb/origin-247-certificate';

@Injectable()
export class TestOffChainService {
    constructor(
        private offChainCertificateService: OffChainCertificateService,
        private blockchainSynchronizeService: BlockchainSynchronizeService,
        private leftoverEnergyValueService: LeftoverEnergyValueService,
        private onChainCertificateFacade: OnChainCertificateFacade
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
                    
            if(certificate.owners[params['adress']] ==  undefined){
                return
            }

            //TODO Temporarily removed, add back in when done
            /* if (certificate.isSynced == false) {
                return
            } */

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

        const leftoverEnergyValuesCurrent = await this.leftoverEnergyValueService.findByAdressAndDate(params['adress'], paramsDate)
        const leftoverEnergyValuesPrevious = await this.leftoverEnergyValueService.findByAdressAndDate(params['adress'], new Date(paramsDate.getFullYear(), paramsDate.getMonth() - 1, 1))

        return {
            currentCerts: userCertificatesCurrent,
            currentLeftoverEnergyValues: leftoverEnergyValuesCurrent,
            previousCerts: userCertificatesPrevious,
            previousLeftoverEnergyValues: leftoverEnergyValuesPrevious
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

    /* public async getCertificateTest() {
        let test;
        await this.onChainCertificateFacade.getWrappedBlockchainProperties().then(async (res) => {
            await console.log('test: ', await res.registry.getCertificate(22))
        })

    } */

    // Check if there are new certificates on the blockchain and add them to the allCertificates array
    private async checkForNewCertificates(): Promise<ICertificateReadModel<any>[]> {
        const certificates = await this.offChainCertificateService.getAll();
        return certificates;
    }
}