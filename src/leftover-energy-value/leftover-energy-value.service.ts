import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LeftoverEnergyValue } from './leftover-energy-value.entity';
import { Repository, Between } from 'typeorm';


@Injectable()
export class LeftoverEnergyValueService {
  constructor(@InjectRepository(LeftoverEnergyValue) private leftoverEnergyValueRepository: Repository<LeftoverEnergyValue>) {}

  async findAll(): Promise<LeftoverEnergyValue[]> {
    return await this.leftoverEnergyValueRepository.find();
  }

  async createEntry(leftoverEnergyValue: LeftoverEnergyValue) {
    const entry = await this.leftoverEnergyValueRepository.create({...leftoverEnergyValue});
    await this.leftoverEnergyValueRepository.save(entry);
  }

  async findByAdressAndDate(userAdress: string, date: Date): Promise<LeftoverEnergyValue[]> {
    return await this.leftoverEnergyValueRepository.find({where: {
      userAdress: userAdress,
      date: Between(new Date(date.getFullYear(), date.getMonth(), 0, 0, 0, 0), new Date(date.getFullYear(), date.getMonth() + 1, 1, 0, 0, 0, 0))
    }});
  }
}
