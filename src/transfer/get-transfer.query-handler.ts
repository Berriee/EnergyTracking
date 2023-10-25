import { GetTransferSitesQuery, IGetTransferSitesQueryHandler, IGetTransferSitesQueryResponse } from '@energyweb/origin-247-transfer';
import { QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetTransferSitesQuery)
export class SitesQueryHandler implements IGetTransferSitesQueryHandler {
    async execute(query: GetTransferSitesQuery): Promise<IGetTransferSitesQueryResponse> {
        const { generatorId } = query.payload;
        console.log('generatorId', generatorId);
        
        const buyerAddress: string = '0x28676008D38Afc981D1edb7b4125f1775591896a'.toLowerCase();
        const sellerAddress: string = '0x44A7943D878fbF2FEa43E1A2bfd7829a307A7e44'.toLowerCase();
    
        return {
            sellerAddress: sellerAddress,
            buyerAddress: buyerAddress,
        };
    }
}