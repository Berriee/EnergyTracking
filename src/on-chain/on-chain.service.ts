import { Injectable } from '@nestjs/common';
import { OnChainCertificateService, ONCHAIN_CERTIFICATE_SERVICE_TOKEN } from '@energyweb/origin-247-certificate';
import { Inject } from '@angular/core';
import { IIssueCommandParams } from '@energyweb/origin-247-certificate';

/**
 * Because certificate entity allows to store custom data called "metadata"
 * user can provide typing for metadata.
 *
 * See README metadata section for more information.
 */
interface IMetadata {
    myCustomCertificateData: string;
  }
  
const params: IIssueCommandParams<IMetadata> = {
    toAddress: '0x123',
    userId: '123',
    energyValue: '123',
    fromTime: new Date(),
    toTime: new Date(),
    deviceId: '123',
    metadata: {
        myCustomCertificateData: '123',
    },
};

@Injectable()
export class OnChainService {
    constructor(
        @Inject(ONCHAIN_CERTIFICATE_SERVICE_TOKEN)
        private certificateService: OnChainCertificateService<IMetadata>
    ) {}
    
    public async issueRandomCertificate(): Promise<void> {
        await this.certificateService.issue(params);
    }
}
