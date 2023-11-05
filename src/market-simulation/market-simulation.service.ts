import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { GenerationReadingStoredEvent } from '@energyweb/origin-247-transfer';
import { BlockchainSynchronizeService, ICertificateReadModel, OffChainCertificateService } from '@energyweb/origin-247-certificate';
import { LeftoverEnergyValueService } from 'src/leftover-energy-value/leftover-energy-value.service';
import { LeftoverEnergyValue } from '../leftover-energy-value/leftover-energy-value.entity';
import { DevicesService } from '../devices/devices.service';
import { Device } from '../devices/device.entity';
import { DeviceTypes } from '../util/device-types.enum'; 

require('dotenv').config();

@Injectable()
export class MarketSimulationService {
    constructor(
        private eventBus: EventBus, 
        private blockchainSynchronizeService: BlockchainSynchronizeService,
        private offChainCertificateService: OffChainCertificateService,
        private leftoverEnergyValueService: LeftoverEnergyValueService,
        private devicesService: DevicesService
        ) {}



    public async startIssueanceSimulation(amountDevices: number) {
        const devices = await this.createDevices(amountDevices);
        const startDate = new Date('2023-10-01');
        const endDate = new Date();
        const days = this.getDates(startDate, endDate);
        this.issueCertificates(days, devices);
    }

    public startClaimSimulation(receiverAdress: string) {
        const startDate = new Date('2023-10-01');
        const endDate = new Date();
        const days = this.getDates(startDate, endDate);
        this.claimCertificateSimulation(days, receiverAdress);

    }

    private issueCertificates(days: Date[], devices: Device[]) {
        days.forEach(day => {
            const generators = this.getRandomInt(1, devices.length);
            const randomCombination = this.getRandomCombination(devices, generators)

            randomCombination.map(async (device) => {
                console.log('GENERATING EVENT FOR DEVICE: ', device.name);
                this.generateEvent(device.name + " " + device.issuerAddress, day);
            })
        });
    }
    // This method creates a random combination with the given Array and the given number of elements
    private getRandomCombination<T>(arr: T[], n: number): T[] {
        const shuffled = [...arr];
        let i = arr.length;
        while (i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled.slice(0, n);
    } 

    private async createDevices(amountDevices: number) {
        try {
            let devices = await this.devicesService.getAllDevicesByIssuer(process.env.ISSUER_ADDRESS.toLowerCase());
            while (devices.length < amountDevices) {
                console.log('GENERATING NEW DEVICES')
                const newDevice = new Device();
                newDevice.issuerAddress = process.env.ISSUER_ADDRESS.toLowerCase();
                newDevice.deviceType = DeviceTypes.SOLAR;
                newDevice.name = `${newDevice.deviceType} ${devices.length + 1}`;
                await this.devicesService.createDevice(newDevice);
                devices = await this.devicesService.getAllDevicesByIssuer(process.env.ISSUER_ADDRESS.toLowerCase());
            }
            return devices;
        } catch (error) {
            console.log(error)
        }
    }

    public synchronize() {
      this.blockchainSynchronizeService.synchronize();
    }    

    private async generateEvent(generatorId: string, day: Date) {
        const fromTime = day
        //fromTime.setHours(fromTime.getHours() + this.getRandomInt(8, 18));
        
        const toTime = fromTime;
        //toTime.setHours(toTime.getHours() + this.getRandomInt(1, 4));

        const transferDate = toTime;
        //transferDate.setHours(transferDate.getHours() + 1);

        const energyValue = this.getRandomInt(1, 4).toString();
        const metadata = null;
        await this.eventBus.publish(
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

    async claimCertificateSimulation(days: Date[], receiverAdress: string) {
        // Get all synchronized and non claimed certificates 
        days.forEach(async (day) => {
            let dailyEnergyConsumption = this.getRandomInt(4, 20);

            const certificates = await this.offChainCertificateService.getAll()
        
            certificates.forEach(async (certificate, index) => {

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

            if (certificate.owners[receiverAdress] === "0") {
                console.log('certificate has already been claimed')

                return
            }


            // Check if the certificate has enough energy value to claim
            if(Number(certificate.owners[receiverAdress]) >= dailyEnergyConsumption) {
                console.log('certificate has enough energy value or leftover energy value to claim. Certificate Energy is: ' + Number(certificate.owners[receiverAdress]) + ' and daily energy consumption is: ' + dailyEnergyConsumption)
                await this.initClaimCertificate(certificate, dailyEnergyConsumption, receiverAdress)
            
            // Checks if the certificate can be used later on
            } else if (Number(certificate.owners[receiverAdress]) < dailyEnergyConsumption /* && (index === certificates.length - 1 || new Date(certificates[index + 1].generationEndTime * 1000).getDay() !== day.getDay()) */) {
                console.log('certificate has not enough energy value to claim')

                await this.initClaimCertificate(certificate, Number(certificate.owners[receiverAdress]), receiverAdress)
                dailyEnergyConsumption -= Number(certificate.owners[receiverAdress])
                
            } else {
                console.log('An unknown Error occured')
            }


            })
            // Add the leftoverEnergyValue to the database
            const leftOverEnergyObject: LeftoverEnergyValue = {
                userAdress: receiverAdress,
                date: day,
                energyValue: dailyEnergyConsumption
            }
            this.leftoverEnergyValueService.createEntry(leftOverEnergyObject);

        });   
    
    }
       

    private async initClaimCertificate(certificate: ICertificateReadModel<any>, energyValue: number, receiverAdress: string) {
        await this.offChainCertificateService.claim({
            certificateId: certificate.internalCertificateId,
            claimData: null,
            forAddress: receiverAdress,
            energyValue: energyValue.toString(),
        })

        console.log('Claim initiated for certificate: ' + certificate.internalCertificateId + ' with energy value: ' + energyValue.toString())
    }

    async getAll() {
        return this.offChainCertificateService.getAll();
    }


}
