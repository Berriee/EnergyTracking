import { Test, TestingModule } from '@nestjs/testing';
import { CertificateTracingService } from './certificate-tracing.service';

describe('CertificateTracingService', () => {
  let service: CertificateTracingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CertificateTracingService],
    }).compile();

    service = module.get<CertificateTracingService>(CertificateTracingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
