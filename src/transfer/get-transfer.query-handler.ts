import { GetTransferSitesQuery, IGetTransferSitesQueryHandler, IGetTransferSitesQueryResponse } from '@energyweb/origin-247-transfer';
import { QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetTransferSitesQuery)
export class SitesQueryHandler implements IGetTransferSitesQueryHandler {
    async execute({}: GetTransferSitesQuery): Promise<IGetTransferSitesQueryResponse> {
        return {
            buyerAddress: '0x4ef085850fE4DfdA1806fdD95e8B5CBEac629B75',
            sellerAddress: '0xBe20904B6F8bf59c0171885828Ab438431b7Cb2c',
        };
    }
}