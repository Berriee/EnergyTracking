import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { GenerationReadingStoredEvent } from '@energyweb/origin-247-transfer';
import { BlockchainSynchronizeService, ICertificateReadModel, OffChainCertificateService } from '@energyweb/origin-247-certificate';
import { ClaimFacade, IConsumption, SpreadMatcher } from '@energyweb/origin-247-claim';
import { ICertificate, IClaimData } from '@energyweb/issuer';
import { issueCertificates } from '@energyweb/issuer/dist/js/src/blockchain-facade/CertificateBatchOperations';

@Injectable()
export class MarketSimulationService {
    constructor(
        private eventBus: EventBus, 
        private blockchainSynchronizeService: BlockchainSynchronizeService,
        private offChainCertificateService: OffChainCertificateService,
        private claimFacade: ClaimFacade,
        ) {}

    public startSimulation() {
        const startDate = new Date('2023-09-01');
        const endDate = new Date();
        const days = this.getDates(startDate, endDate);
        this.issueCertificates(days);
        /* this.claimCertificateSimulation(days); */
    }

    public startClaimSimulation() {
        const startDate = new Date('2023-09-01');
        const endDate = new Date();
        const days = this.getDates(startDate, endDate);
        this.claimCertificateSimulation(days);

    }

    private issueCertificates(days: Date[]) {
        /* const startDate = new Date('2023-09-01');
        const endDate = new Date();
        const days = this.getDates(startDate, endDate); */
        days.forEach(day => {
            const generators = this.getRandomInt(1, 3);

            switch (generators) {
                case 1:
                    this.generateEvent('1', day);
                    break;
                case 2:
                    this.generateEvent('2', day);
                    break;
                //both sellers generate 
                case 3:
                    this.generateEvent('1', day);
                    this.generateEvent('2', day);
                    break;
            }
        });
    }

    public synchronize() {
      this.blockchainSynchronizeService.synchronize();
    }    

    private generateEvent(generatorId: string, day: Date) {
        const fromTime = day
        //fromTime.setHours(fromTime.getHours() + this.getRandomInt(8, 18));
        
        const toTime = fromTime;
        //toTime.setHours(toTime.getHours() + this.getRandomInt(1, 4));

        const transferDate = toTime;
        //transferDate.setHours(transferDate.getHours() + 1);

        const energyValue = this.getRandomInt(1, 8).toString();
        const metadata = null;
        this.eventBus.publish(
            new GenerationReadingStoredEvent({
                generatorId: generatorId,
                fromTime: fromTime,
                toTime: toTime,
                transferDate: transferDate,
                energyValue: energyValue,
                metadata: metadata
            })
        );
    }

    private getRandomInt(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    private getDates(startDate: Date, endDate: Date) {
        const dates = [];
        let currentDate = startDate;
        while (currentDate <= endDate) {
            dates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return dates;
    }

    async claimCertificateSimulation(days: Date[]) {
        // Get all synchronized and non claimed certificates 
        let leftoverEnergyValue = [];
        days.forEach(async (day) => {
            this.offChainCertificateService.getAll().then((certificates) => {
                certificates.forEach((certificate, index) => {
                                     // Add only claimable certificates to the array

                //TODO add this after beeing done with the code documentation
                /* if (certificate.isSynced == false) {
                    return
                } */

                //Check if the certificate generationEndTime is on the same day or in the past as the current day

                const generationEndTime = new Date(certificate.generationEndTime * 1000);

                if(generationEndTime.getDay() > day.getDay()) {
                    console.log('certificate generationEndTime is in the future')

                    return
                }

                if (certificate.owners['0xb923e9d65104c7895B3DA5e95FB1A601E02Cf3F6'] === "0") {
                    console.log('certificate has already been claimed')

                    return
                }

                const dailyEnergyConsumption = this.getRandomInt(2, 12);

                // Check if the certificate has enough energy value to claim
                if(Number(certificate.owners['0xb923e9d65104c7895B3DA5e95FB1A601E02Cf3F6']) >= dailyEnergyConsumption) {
                    console.log('certificate has enough energy value or leftover energy value to claim. Certificate Energy is: ' + Number(certificate.owners['0xb923e9d65104c7895B3DA5e95FB1A601E02Cf3F6']) + ' and daily energy consumption is: ' + dailyEnergyConsumption),


                    //consumedCertificates.push(certificate);
                    this.initClaimCertificate(certificate, dailyEnergyConsumption)
                
                // Checks if the certificate certificate can be used later on
                } else if (Number(certificate.owners['0xb923e9d65104c7895B3DA5e95FB1A601E02Cf3F6']) < dailyEnergyConsumption && (index === certificates.length - 1 || new Date(certificates[index + 1].generationEndTime * 1000).getDay() !== day.getDay())) {
                    console.log('certificate has not enough energy value to claim')

                    this.initClaimCertificate(certificate, Number(certificate.owners['0xb923e9d65104c7895B3DA5e95FB1A601E02Cf3F6']))
                    leftoverEnergyValue.push(
                            {
                                leftoverDate: day,
                                leftoverEnergy: dailyEnergyConsumption - Number(certificate.owners['0xb923e9d65104c7895B3DA5e95FB1A601E02Cf3F6'])
                            }
                    )
                } /* else {
                    throw new Error('An unknown error occured');
                } */


                })
            })
        });
        console.log(leftoverEnergyValue)
        // deletes the certificate from the array after it has been claimed
        //TODO: this.offChainCertificateService.batchClaim({});
    
    
    }
       

    private initClaimCertificate(certificate: ICertificateReadModel<any>, energyValue: number) {
        /* const claimData: IClaimData = {
            energyValue: energyValue,
            metadata: null
        } */
        this.offChainCertificateService.claim({
            certificateId: certificate.internalCertificateId,
            claimData: null,
            forAddress: '0xb923e9d65104c7895B3DA5e95FB1A601E02Cf3F6',
            energyValue: energyValue.toString(),
        })

        console.log('Claim initiated for certificate: ' + certificate + ' with energy value: ' + energyValue.toString())
    }


    async testClaim(certId: number, amount: number) {
        try {
            this.offChainCertificateService.claim({
                certificateId: 2661,
                claimData: null,
                forAddress: '0xb923e9d65104c7895B3DA5e95FB1A601E02Cf3F6',
                energyValue: '1',
            })
        }
        catch (error) {
            console.log(error);
        }

        return this.offChainCertificateService.getAll();
        
    }

    async getAll() {
        return this.offChainCertificateService.getAll();
    }


}
