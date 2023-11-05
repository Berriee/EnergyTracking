import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
     ) {}
    
    // This function is used to check if the user is authenticated
    // If the user is authenticated, the request is allowed to pass
    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization;

        if (token) {
            const decoded = this.jwtService.verify(token)

            if(decoded) {
                request.user = decoded;
                return true;
            }
        } else {
            return false;
        }
    }
}
