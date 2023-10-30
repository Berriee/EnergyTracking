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

import { SitesQueryHandler } from './transfer/get-transfer.query-handler';
import { TransferController } from './transfer/transfer.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { CertificateTracingController } from './certificate-tracing/certificate-tracing.controller';
import { CertificateTracingService } from './certificate-tracing/certificate-tracing.service';
import { ClaimModule } from '@energyweb/origin-247-claim';

import { MarketSimulationController } from './market-simulation/market-simulation.controller';
import { MarketSimulationService } from './market-simulation/market-simulation.service';

import { LeftoverEnergyValue as LeftoverEnergyValueEntity } from './leftover-energy-value/leftover-energy-value.entity';
import { LeftoverEnergyValueService } from './leftover-energy-value/leftover-energy-value.service';

import { DevicesService } from './devices/devices.service';
import { Device } from './devices/device.entity';

import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { User } from './users/user.entity';


@Module({
  imports: [
    TransferModule.register({
      validateCommands: [
    
      ]
    }),
    TypeOrmModule.forFeature([LeftoverEnergyValueEntity, Device, User]),
    TypeOrmModule.forRoot({
      type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'origin',
        entities: [...OnChainCertificateEntities, ...OffChainCertificateEntities, EnergyTransferRequestEntity, LeftoverEnergyValueEntity, Device, User],
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
    
  ],
  controllers: [AppController, CertificateTracingController, MarketSimulationController, UsersController],
  providers: [AppService, CertificateTracingService, MarketSimulationService, SitesQueryHandler, LeftoverEnergyValueService, DevicesService, UsersService],
})
export class AppModule {}
