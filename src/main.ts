import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
<<<<<<< Updated upstream
  await app.listen(3000);
=======
  const blockchainFacade = await app.resolve<OnChainCertificateFacade>(OnChainCertificateFacade);
  await blockchainFacade.deploy();
  app.listen(3000);
>>>>>>> Stashed changes
}
bootstrap();
