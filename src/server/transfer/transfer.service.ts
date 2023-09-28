import { GenerationReadingStoredEvent } from '@energyweb/origin-247-transfer';
import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus, EventBus } from '@nestjs/cqrs';

@Injectable()
export class SimulationTransferService {
    constructor(private eventBus: EventBus) {}

    public sendEvent() {
        this.eventBus.publish(
            new GenerationReadingStoredEvent({
                generatorId: '1',
                fromTime: new Date(),
                toTime: new Date(),
                transferDate: new Date(),
                energyValue: '1000',
                metadata: null
            })
        );
    }
    
}
