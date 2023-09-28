import { Module } from '@nestjs/common';
import { OnChainCertificateModule } from '@energyweb/origin-247-certificate';
import { OnChainController } from './on-chain.controller';

@Module({
    imports: [OnChainCertificateModule],
    controllers: [OnChainController],
})
export class OnChainModule {}
