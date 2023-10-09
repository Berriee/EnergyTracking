import { Controller, Get } from '@nestjs/common';
import { RegisterDeviceService } from './register-device.service';

@Controller('register-device')
export class RegisterDeviceController {
    constructor(private registerService: RegisterDeviceService) {}
    @Get()
    async registerDevice() {
        this.registerService.registerDevice();
    }
}
