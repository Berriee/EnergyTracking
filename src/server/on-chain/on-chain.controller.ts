import { Controller, Get } from '@nestjs/common';
import { OnChainService } from './on-chain.service';

@Controller('on-chain')
export class OnChainController {
    constructor(private onChainService: OnChainService) {}

    @Get()
    async issueCertificate(): Promise<void> {
        this.onChainService.issueCertificate();
        return;
    }
}
