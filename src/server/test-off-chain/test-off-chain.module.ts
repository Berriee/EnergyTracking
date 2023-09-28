import { Module } from '@nestjs/common';
import { TestOffChainService } from './test-off-chain.service';
import { TestOffChainController } from './test-off-chain.controller';

@Module({
  providers: [TestOffChainService],
  controllers: [TestOffChainController]
})
export class TestOffChainModule {}
