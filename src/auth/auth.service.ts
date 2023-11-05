import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

const ethUtil = require('ethereumjs-util');
const jwt = require('jsonwebtoken');
require('dotenv').config();

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
     ) {}

    async generateToken(userAddress: string, signedMessage: string) {
        const user = await this.userService.getUser(userAddress);
        if(!user) {
            return null;
        }

        const msg = `Nonce: ${user.nonce}`;
        // Convert msg to hex string
        const msgHex = ethUtil.bufferToHex(Buffer.from(msg));
        // Check if signature is valid
        const msgBuffer = ethUtil.toBuffer(msgHex);
        const msgHash = ethUtil.hashPersonalMessage(msgBuffer);
        
        // Convert signature to buffer
        const signatureBuffer = ethUtil.toBuffer(signedMessage);

        const signatureParams = ethUtil.fromRpcSig(signatureBuffer);
        
        // Recover public key from signature
        const publicKey = ethUtil.ecrecover(
            // Hash value of the message
            msgHash,
            // Recovery id from the signature
            signatureParams.v,
            // Parts of the signature are stored in the signatureParams object
            signatureParams.r,
            signatureParams.s
        );
        // Convert public key to address
        const addresBuffer = ethUtil.publicToAddress(publicKey);
        // Convert address buffer to hex string
        const address = ethUtil.bufferToHex(addresBuffer);
        // Check if address matches
        if (address.toLowerCase() === userAddress.toLowerCase()) {
            // Change user nonce because the nonce can only be used once
            user.nonce = Math.floor(Math.random() * 1000000);
            this.userService.updateUserNonce(userAddress, user.nonce);
            
            
            // Set and return jwt token
            const token = jwt.sign({
                _id: user.id,
                address: user.userAddress
            }, process.env.JWT_SECRET, {expiresIn: '6h'});
            return {
                success: true,
                token: token,
                user: user,
                msg: "You are now logged in."
            };
        } else {
            // User is not authenticated
            return null
        }


    }
}

