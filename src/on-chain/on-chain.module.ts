import { Module } from '@nestjs/common';
import { OnChainCertificateModule } from '@energyweb/origin-247-certificate';

@Module({
    imports: [OnChainCertificateModule],
})
export class OnChainModule {}
