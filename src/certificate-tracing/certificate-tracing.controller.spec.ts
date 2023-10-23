import { Test, TestingModule } from '@nestjs/testing';
import { CertificateTracingController } from './certificate-tracing.controller';

describe('CertificateTracingController', () => {
  let controller: CertificateTracingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CertificateTracingController],
    }).compile();

    controller = module.get<CertificateTracingController>(CertificateTracingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
