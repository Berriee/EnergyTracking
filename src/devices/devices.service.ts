import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Device } from './device.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DevicesService {
    constructor(@InjectRepository(Device) private deviceRepository: Repository<Device>) {}

    async createDevice(device: Device) {
        await this.deviceRepository.save(device);
    }

    async findDevice(id: number) {
        await this.deviceRepository.findOne({where: {id: id}})
    }

    async getAllDevices() {
        return await this.deviceRepository.find();
    }

    async getAllDevicesByIssuer(issuerAddress) {
        return await this.deviceRepository.find({where: {issuerAddress: issuerAddress}})
    }

}
