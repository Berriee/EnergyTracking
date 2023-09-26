import { GetTransferSitesQuery, IGetTransferSitesQueryHandler, IGetTransferSitesQueryResponse } from '@energyweb/origin-247-transfer';
import { QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetTransferSitesQuery)
export class SitesQueryHandler implements IGetTransferSitesQueryHandler {
    async execute(query: GetTransferSitesQuery): Promise<IGetTransferSitesQueryResponse> {
        const { generatorId } = query.payload;
        console.log('generatorId', generatorId);

        return {
            buyerAddress: '0x830b81118bbc373B10D6996f03158009BD8660A9',
            sellerAddress: '0x0680850F7093520B670d692dAFc4b1995d7f9c00',
        };
    }
}