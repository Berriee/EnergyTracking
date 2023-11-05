import { Controller, Get, Post, Param, Body, Res, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';



@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService, 
    ) {}

    @Get(':userAddress')
    async getUser(@Param('userAddress') userAddress: string) {
        const user = await this.usersService.getUser(userAddress)
        
        if (user !== undefined) {
            return user.userAddress
        } else {
            return ""
        }
    }

    @Post(':userAddress')
    async createUser(@Param('userAddress') userAddress: string) {
        return await this.usersService.createUser(userAddress);
    }
    
    @Get(':userAddress/nonce')
    async startSimulation(@Param('userAddress') userAddress: string) {
        return (await this.usersService.getUser(userAddress)).nonce;
    }

    @Post(':userAddress/signature')
    async handleSignature(
        @Param('userAddress') userAddress: string,
        @Body() signedMessage: Object,
        @Res() res: Response,
        ) {        
        
        const response = this.usersService.generateToken(userAddress, signedMessage['signedMessage'])
        return response
        

    }
}
