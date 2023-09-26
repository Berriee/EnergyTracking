import { GetTransferSitesQuery } from '@energyweb/origin-247-transfer';
import { Module } from '@nestjs/common';

@Module({
    providers: [GetTransferSitesQuery],
})
export class SimulationTransferModule {}
