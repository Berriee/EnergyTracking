import { GetTransferSitesQuery, IGetTransferSitesQueryHandler, IGetTransferSitesQueryResponse } from '@energyweb/origin-247-transfer';
import { QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetTransferSitesQuery)
export class SitesQueryHandler implements IGetTransferSitesQueryHandler {
    async execute(query: GetTransferSitesQuery): Promise<IGetTransferSitesQueryResponse> {
        const { generatorId } = query.payload;
        console.log('generatorId', generatorId);
        
        const buyerAddress: string = '0xb923e9d65104c7895B3DA5e95FB1A601E02Cf3F6';
        const sellerAddress: string = '0xF8b904347a4c8Fa7Eb22B73304d849a11CD59Ad8';
    
        return {
            sellerAddress: sellerAddress,
            buyerAddress: buyerAddress,
        };
    }
}