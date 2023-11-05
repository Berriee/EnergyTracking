import { Injectable } from '@nestjs/common';
import { User } from './user.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class UsersService {
         
    constructor(@InjectRepository(User) private userRepository: Repository<User> ) {}

    // This Method is used to create a new user in the database
    // When a user is created, a nonce is generated 
    async createUser(userAddress: string) {
        const nonce = Math.floor(Math.random() * 1000000);
        const formattedNonce = Number(nonce.toString().padStart(6, '0'))
        const newUser: User = {
            userAddress: userAddress,
            nonce: formattedNonce
        }
        return await this.userRepository.save(newUser);
    }

    // This Method is used to get a user from the database
    async getUser(userAddress: string) {
        return await this.userRepository.findOne({where: {userAddress: userAddress}});
    }

    // This Method is used to update the nonce of a user
    async updateUserNonce(userAddress: string, nonce: number) {
        return await this.userRepository.update({userAddress: userAddress}, {nonce: nonce});
    }
}
