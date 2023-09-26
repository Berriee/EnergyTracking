import { Injectable } from '@nestjs/common';
import { OffChainCertificateService } from '@energyweb/origin-247-certificate';
import { BlockchainSynchronizeService } from '@energyweb/origin-247-certificate';

@Injectable()
export class TestOffChainService {
    constructor(
        private offChainCertificateService: OffChainCertificateService,
        private blockchainSynchronizeService: BlockchainSynchronizeService
    ) {}

    public async offchainCert(): Promise<any>{
        this.blockchainSynchronizeService.synchronize();
        return this.offChainCertificateService.getAll();
    }
    
}