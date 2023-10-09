import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { OnChainCertificateFacade } from '@energyweb/origin-247-certificate';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const blockchainFacade = await app.resolve<OnChainCertificateFacade>(OnChainCertificateFacade);
  app.enableCors();
  await blockchainFacade.deploy();

    const options = new DocumentBuilder()
      .setTitle('Energy Tracking API Doc')
      .setDescription('The Energy Tracking API description')
      .setVersion('1.0')
      .addTag('energy-tracking')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);

  app.listen(8000);
}
bootstrap();
