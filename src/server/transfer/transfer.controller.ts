import { Controller, Get } from '@nestjs/common';
import { SimulationTransferService } from './transfer.service';

@Controller('transfer')
export class TransferController {
    constructor(private transferService: SimulationTransferService) {}

    @Get()
    async doSomething() {
        console.log('do something');
        this.transferService.sendEvent();
    }

}
