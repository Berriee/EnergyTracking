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

@Module({
  imports: [
    
    TypeOrmModule.forRoot({
      type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'origin',
        entities: [...OnChainCertificateEntities, ...OffChainCertificateEntities],
        synchronize: true,
    }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    OnChainCertificateModule,
  ],
  controllers: [AppController, OnChainController],
  providers: [AppService, OnChainService],
})
export class AppModule {}
