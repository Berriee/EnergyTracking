import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BullModule } from '@nestjs/bull';
import { OnChainCertificateEntities } from '@energyweb/origin-247-certificate';
import { TypeOrmModule } from '@nestjs/typeorm';
<<<<<<< Updated upstream
=======
import { OnChainCertificateModule } from '@energyweb/origin-247-certificate';
import { OnChainController } from './on-chain/on-chain.controller';
import { OnChainService } from './on-chain/on-chain.service';
>>>>>>> Stashed changes

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'test',
        entities: [...OnChainCertificateEntities],
        synchronize: true,
    }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
  ],
<<<<<<< Updated upstream
  controllers: [AppController],
  providers: [AppService],
=======
  controllers: [AppController, OnChainController],
  providers: [AppService, OnChainService],
  
>>>>>>> Stashed changes
})
export class AppModule {}
