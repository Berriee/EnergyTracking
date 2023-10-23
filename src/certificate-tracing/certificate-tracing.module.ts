import { Module } from '@nestjs/common';
import { CertificateTracingService } from './certificate-tracing.service';
import { CertificateTracingController } from './certificate-tracing.controller';

@Module({
  providers: [CertificateTracingService],
  controllers: [CertificateTracingController]
})
export class TestOffChainModule {}
