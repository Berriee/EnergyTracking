import { GetTransferSitesQuery, IGetTransferSitesQueryHandler, IGetTransferSitesQueryResponse } from '@energyweb/origin-247-transfer';
import { QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetTransferSitesQuery)
export class SitesQueryHandler implements IGetTransferSitesQueryHandler {
    async execute(query: GetTransferSitesQuery): Promise<IGetTransferSitesQueryResponse> {
        const { generatorId } = query.payload;
        console.log('generatorId', generatorId);

        return {
            buyerAddress: '0x824cfB1Eda5E38c9423712a71Ea7A861c54809Cd',
            sellerAddress: '0xCbe7f1C3031F862cc0E9fd46B1D011B4ccDf154c',
        };
    }
}