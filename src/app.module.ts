import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BullModule } from '@nestjs/bull';
import { OnChainCertificateEntities } from '@energyweb/origin-247-certificate';
import { OffChainCertificateEntities } from '@energyweb/origin-247-certificate';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OnChainCertificateModule } from '@energyweb/origin-247-certificate';
import { OnChainController } from './on-chain/on-chain.controller';
import { OnChainService } from './on-chain/on-chain.service';
import { EnergyTransferRequestEntity } from '@energyweb/origin-247-transfer';
import { TransferModule } from '@energyweb/origin-247-transfer';
import { SimulationTransferService } from './transfer/transfer.service';
import { SimulationTransferModule } from './transfer/transfer.module';
import { IGetTransferSitesQueryHandler } from '@energyweb/origin-247-transfer';
import { TestOffChainModule } from './test-off-chain/test-off-chain.module';

@Module({
  imports: [
    /* TransferModule.register({
      validateCommands: [
    
      ]
    }), */

    TypeOrmModule.forRoot({
      type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'origin',
        entities: [...OnChainCertificateEntities, ...OffChainCertificateEntities/* , EnergyTransferRequestEntity */],
        synchronize: true,
    }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    OnChainCertificateModule,
    TransferModule,
    SimulationTransferModule,
    TestOffChainModule,
  ],
  controllers: [AppController, OnChainController],
  providers: [AppService, OnChainService, /* SimulationTransferService */],
})
export class AppModule {}
