import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BullModule } from '@nestjs/bull';
import { OffChainCertificateModule, OffChainCertificateService, OnChainCertificateEntities } from '@energyweb/origin-247-certificate';
import { OffChainCertificateEntities } from '@energyweb/origin-247-certificate';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OnChainCertificateModule } from '@energyweb/origin-247-certificate';
import { EnergyTransferRequestEntity } from '@energyweb/origin-247-transfer';
import { TransferModule } from '@energyweb/origin-247-transfer';
import { SimulationTransferService } from './transfer/transfer.service';
import { SitesQueryHandler } from './transfer/get-transfer.query-handler';
import { TransferController } from './transfer/transfer.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { TestOffChainController } from './test-off-chain/test-off-chain.controller';
import { TestOffChainService } from './test-off-chain/test-off-chain.service';
import { ClaimModule } from '@energyweb/origin-247-claim';
import { entities as ClaimEntitites } from '@energyweb/origin-247-claim';
import { ClaimTestService } from './claim-test/claim-test.service';
import { ClaimTestController } from './claim-test/claim-test.controller';
import { MarketSimulationController } from './market-simulation/market-simulation.controller';
import { MarketSimulationService } from './market-simulation/market-simulation.service';
import { RegisterDeviceController } from './register-device/register-device.controller';
import { RegisterDeviceService } from './register-device/register-device.service';
import { 
  entities as DeviceRegistryEntities,
  DeviceRegistryModule,
} from  '@energyweb/origin-device-registry-api';
import { AppModule as BackendModule, entities as BackendEntities } from '@energyweb/origin-backend';


@Module({
  imports: [
    BackendModule,
    ClaimModule,
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
        entities: [...OnChainCertificateEntities, ...OffChainCertificateEntities, EnergyTransferRequestEntity, ...ClaimEntitites, ...BackendEntities, ...DeviceRegistryEntities],
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
    TransferModule,
    CqrsModule,
    DeviceRegistryModule
  ],
  controllers: [AppController, TestOffChainController, MarketSimulationController],
  providers: [AppService, TestOffChainService, MarketSimulationService, SitesQueryHandler],
})
export class AppModule {}
