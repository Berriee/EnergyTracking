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

    public async offchainCert(): Promise<any>{
        await this.offChainCertificateService.issue({
            toAddress: '0x011bdA31F1AD7cC6E51D2E7DCB04Bbb8D812e103',
            userId: '1',
            energyValue: '10000',
            fromTime: new Date(),
            toTime: new Date(),
            deviceId: '1',
            metadata: null,
        });

        this.blockchainSynchronizeService.synchronize();
        return await this.offChainCertificateService.getAll();
    }
    
}