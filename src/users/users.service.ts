import { Injectable } from '@nestjs/common';
import { User } from './user.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
const ethUtil = require('ethereumjs-util');
const jwt = require('jsonwebtoken');
require('dotenv').config();

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

    async generateToken(userAddress: string, signedMessage: string) {
        const user = await this.getUser(userAddress);
        if(!user) {
            return null;
        }

        const msg = `Nonce: ${user.nonce}`;
        // Convert msg to hex string
        const msgHex = ethUtil.bufferToHex(Buffer.from(msg));
        console.log(1)
        // Check if signature is valid
        const msgBuffer = ethUtil.toBuffer(msgHex);
        console.log(2)

        const msgHash = ethUtil.hashPersonalMessage(msgBuffer);
        console.log(3)

        const signatureBuffer = ethUtil.toBuffer(signedMessage);
        console.log(4)

        const signatureParams = ethUtil.fromRpcSig(signatureBuffer);
        console.log(5)
        const publicKey = ethUtil.ecrecover(
            msgHash,
            signatureParams.v,
            signatureParams.r,
            signatureParams.s
        );
        console.log(6)
        const addresBuffer = ethUtil.publicToAddress(publicKey);
        console.log(7)
        const address = ethUtil.bufferToHex(addresBuffer);
        console.log(process.env.JWT_SECRET)

        // Check if address matches
        if (address.toLowerCase() === userAddress.toLowerCase()) {
            // Change user nonce
            user.nonce = Math.floor(Math.random() * 1000000);
            this.userRepository
            .createQueryBuilder()
            .update(User)
            .set({nonce: user.nonce})
            .where({userAddress: userAddress})
            .execute()
            .then((res) => {
                if (res.affected === 1) {
                    console.log(`Updated nonce for user with userAddress ${userAddress}`);
                  } else {
                    console.log(`User with userAddress ${userAddress} not found`);
                  }
            })
            
            // Set jwt token
            const token = jwt.sign({
                _id: user.id,
                address: user.userAddress
            }, process.env.JWT_SECRET, {expiresIn: '6h'});
            return {
                success: true,
                token: `Bearer ${token}`,
                user: user,
                msg: "You are now logged in."
            };
        } else {
            // User is not authenticated
            return null
        }
    }
}
