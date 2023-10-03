import { GetTransferSitesQuery, IGetTransferSitesQueryHandler, IGetTransferSitesQueryResponse } from '@energyweb/origin-247-transfer';
import { QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetTransferSitesQuery)
export class SitesQueryHandler implements IGetTransferSitesQueryHandler {
    async execute(query: GetTransferSitesQuery): Promise<IGetTransferSitesQueryResponse> {
        const { generatorId } = query.payload;
        console.log('generatorId', generatorId);
        
        const buyerAddress: string = '0xb923e9d65104c7895B3DA5e95FB1A601E02Cf3F6';
        let sellerAddress: string;
        
        //TODO: 2. Seller address apparently needs to be registered as issuer
        if (generatorId === '1') {
            sellerAddress = '0xF8b904347a4c8Fa7Eb22B73304d849a11CD59Ad8';
        } else if (generatorId === '2') {
            sellerAddress = '0x011bdA31F1AD7cC6E51D2E7DCB04Bbb8D812e103';
        }

        return {
            sellerAddress: sellerAddress,
            buyerAddress: buyerAddress,
        };
    }
}