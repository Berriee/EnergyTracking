import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { GenerationReadingStoredEvent } from '@energyweb/origin-247-transfer';
import { BlockchainSynchronizeService } from '@energyweb/origin-247-certificate';

@Injectable()
export class MarketSimulationService {
    constructor(
        private eventBus: EventBus, 
        private blockchainSynchronizeService: BlockchainSynchronizeService
        ) {}

    public startSimulation() {
        
        const startDate = new Date('2023-09-01');
        const endDate = new Date();
        const days = this.getDates(startDate, endDate);
        days.forEach(day => {
            const generators = this.getRandomInt(1, 3);

            switch (generators) {
                case 1:
                    this.generateEvent('1', day);
                    break;
                case 2:
                    this.generateEvent('2', day);
                    break;
                //both sellers generate 
                case 3:
                    this.generateEvent('1', day);
                    this.generateEvent('2', day);
                    break;
            }
        });
    }

    public synchronize() {
      this.blockchainSynchronizeService.synchronize();
    }    

    private generateEvent(generatorId: string, day: Date) {
        const fromTime = day
        fromTime.setHours(fromTime.getHours() + this.getRandomInt(8, 18));
        
        const toTime = fromTime;
        toTime.setHours(toTime.getHours() + this.getRandomInt(1, 4));

        const transferDate = toTime;
        transferDate.setHours(transferDate.getHours() + 1);

        const energyValue = this.getRandomInt(1, 100).toString();
        const metadata = null;
        this.eventBus.publish(
            new GenerationReadingStoredEvent({
                generatorId: generatorId,
                fromTime: fromTime,
                toTime: toTime,
                transferDate: transferDate,
                energyValue: energyValue,
                metadata: metadata
            })
        );
    }

    private getRandomInt(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    private getDates(startDate: Date, endDate: Date) {
        const dates = [];
        let currentDate = startDate;
        while (currentDate <= endDate) {
            dates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return dates;
    }
}
