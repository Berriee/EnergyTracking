import { Injectable, Inject } from '@nestjs/common';
import { OnChainCertificateService, ONCHAIN_CERTIFICATE_SERVICE_TOKEN } from '@energyweb/origin-247-certificate';
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
    toAddress: '0x4ef085850fE4DfdA1806fdD95e8B5CBEac629B75',
    userId: '1',
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
    
    public async issueCertificate(): Promise<void> {
        await this.certificateService.issue(params);
    }
}
