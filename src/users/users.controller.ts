import { Controller, Get, Post, Param } from '@nestjs/common';
import { UsersService } from './users.service';



@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService, 
    ) {}

    // This endpoint is used to get a user
    @Get(':userAddress')
    async getUser(@Param('userAddress') userAddress: string) {
        const user = await this.usersService.getUser(userAddress)
        
        if (user !== undefined) {
            return user.userAddress
        } else {
            return ""
        }
    }

    // This endpoint is used to create a new user
    @Post(':userAddress')
    async createUser(@Param('userAddress') userAddress: string) {
        return await this.usersService.createUser(userAddress);
    }
    
    // This endpoint is used to get the nonce of a user
    @Get(':userAddress/nonce')
    async startSimulation(@Param('userAddress') userAddress: string) {
        return (await this.usersService.getUser(userAddress)).nonce;
    }

}
