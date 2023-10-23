import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LeftoverEnergyValue } from './leftover-energy-value.entity';
import { Repository, Between } from 'typeorm';
import { ICertificateRequestParams } from '../util/certificate-request-params.interface'


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

  async findByAddressAndDate(requestParams: ICertificateRequestParams): Promise<LeftoverEnergyValue[]> {
    return await this.leftoverEnergyValueRepository.find({where: {
      userAdress: requestParams.address,
      date: Between(new Date(requestParams.year, requestParams.month, 0, 0, 0, 0), new Date(requestParams.year, requestParams.month + 1, 1, 0, 0, 0, 0))
    }});
  }
}
