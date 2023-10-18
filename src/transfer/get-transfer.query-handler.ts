import { GetTransferSitesQuery, IGetTransferSitesQueryHandler, IGetTransferSitesQueryResponse } from '@energyweb/origin-247-transfer';
import { QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetTransferSitesQuery)
export class SitesQueryHandler implements IGetTransferSitesQueryHandler {
    async execute(query: GetTransferSitesQuery): Promise<IGetTransferSitesQueryResponse> {
        const { generatorId } = query.payload;
        console.log('generatorId', generatorId);
        
        const buyerAddress: string = '0x9145FC2a91BEaDf7a5eFfe4BC9D1584b5568b4F1';
        const sellerAddress: string = '0x82Eac5fF0aA68f8c26cA8D054C87e34c03a5284f';
    
        return {
            sellerAddress: sellerAddress,
            buyerAddress: buyerAddress,
        };
    }
}