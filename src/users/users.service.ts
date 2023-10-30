import { Injectable } from '@nestjs/common';
import { User } from './user.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
         
    constructor(@InjectRepository(User) private userRepository: Repository<User> ) {}

    async createUser(userAddress: string) {
        const nonce = Math.floor(Math.random() * 1000000);
        const formattedNonce = Number(nonce.toString().padStart(6, '0'))
        const newUser: User = {
            userAddress: userAddress,
            nonce: formattedNonce
        }
        return await this.userRepository.save(newUser);
    }

    async getUser(userAddress: string) {
        return await this.userRepository.findOne({where: {userAddress: userAddress}});
    }
}
