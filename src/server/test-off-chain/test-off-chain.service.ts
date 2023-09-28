import { Injectable } from '@nestjs/common';
import { OffChainCertificateService } from '@energyweb/origin-247-certificate';
import { BlockchainSynchronizeService } from '@energyweb/origin-247-certificate';
import * as dotenv from 'dotenv';

@Injectable()
export class TestOffChainService {
    constructor(
        private offChainCertificateService: OffChainCertificateService,
        private blockchainSynchronizeService: BlockchainSynchronizeService
    ) {}

    public async createOffchainCert(): Promise<any>{
        //await this.blockchainSynchronizeService.synchronize();
        await this.offChainCertificateService.issue({
            toAddress: '0xb923e9d65104c7895B3DA5e95FB1A601E02Cf3F6',
            userId: '1',
            energyValue: '1000',
            fromTime: new Date(),
            toTime: new Date(),
            deviceId: '1',
            metadata: null,
        });
        return await this.offChainCertificateService.claim({
            certificateId: 2,
            claimData: null,
            forAddress: '0xb923e9d65104c7895B3DA5e95FB1A601E02Cf3F6',
            energyValue: '200',
        })
        this.offChainCertificateService.getAll
        /* await this.blockchainSynchronizeService.synchronize();
        return await this.offChainCertificateService.getAll(); */
    }
    
}