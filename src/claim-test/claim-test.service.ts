import { Injectable } from '@nestjs/common';
import { ClaimFacade } from '@energyweb/origin-247-claim';


@Injectable()
export class ClaimTestService {
    constructor(
        private claimFacade: ClaimFacade,
    ) {}

    public async claimTest(): Promise<any>{

    }
}
