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
import { SitesQueryHandler } from './transfer/get-transfer.query-handler';
import { TransferController } from './transfer/transfer.controller';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [
    TransferModule.register({
      validateCommands: [
    
      ]
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'origin',
        entities: [...OnChainCertificateEntities, ...OffChainCertificateEntities, EnergyTransferRequestEntity],
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
    CqrsModule,
  ],
  controllers: [AppController, OnChainController, TransferController],
  providers: [AppService, OnChainService, SimulationTransferService, SitesQueryHandler],
})
export class AppModule {}
