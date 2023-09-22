import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { OnChainCertificateFacade } from '@energyweb/origin-247-certificate';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  const blockchainFacade = await app.resolve<OnChainCertificateFacade>(OnChainCertificateFacade);
  await blockchainFacade.deploy();
  
}
bootstrap();