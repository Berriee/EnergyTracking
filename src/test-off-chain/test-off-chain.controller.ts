import { Controller, Get } from '@nestjs/common';
import { TestOffChainService } from './test-off-chain.service';

@Controller('test-off-chain')
export class TestOffChainController {
    constructor(private onChainService: TestOffChainService) {}

    @Get()
    async getAllQuestionmark(): Promise<any> {
        return this.onChainService.offchainCert()
    }
}