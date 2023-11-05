import { Controller, Post, Param, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) {}

    // This endpoint receives the signature of the user and returns a JWT token if the signature is valid
    @Post(':userAddress/signature')
    async handleSignature(
        @Param('userAddress') userAddress: string,
        @Body() signedMessage: Object,
        ) {        
        
        const response = await this.authService.generateToken(userAddress, signedMessage['signedMessage'])
        return response
    }
}
