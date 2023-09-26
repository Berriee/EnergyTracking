import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BullModule } from '@nestjs/bull';
import { OffChainCertificateModule, OnChainCertificateEntities } from '@energyweb/origin-247-certificate';
import { OffChainCertificateEntities } from '@energyweb/origin-247-certificate';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OnChainCertificateModule } from '@energyweb/origin-247-certificate';
import { OnChainController } from './on-chain/on-chain.controller';
import { OnChainService } from './on-chain/on-chain.service';
import { TestOffChainController } from './test-off-chain/test-off-chain.controller';
import { TestOffChainService } from './test-off-chain/test-off-chain.service';
import { ClaimModule } from '@energyweb/origin-247-claim';
import { entities as ClaimEntitites } from '@energyweb/origin-247-claim';
import { ClaimTestService } from './claim-test/claim-test.service';
import { ClaimTestController } from './claim-test/claim-test.controller';



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'origin',
        entities: [...OnChainCertificateEntities, ...OffChainCertificateEntities, ...ClaimEntitites],
        synchronize: true,
    }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    OffChainCertificateModule,
    OnChainCertificateModule,
    ClaimModule,
  ],
  controllers: [AppController, OnChainController, TestOffChainController, ClaimTestController],
  providers: [AppService, OnChainService, TestOffChainService, ClaimTestService],
})
export class AppModule {}
