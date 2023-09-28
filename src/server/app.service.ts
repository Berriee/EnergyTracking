import { Injectable } from '@nestjs/common';
import { Module } from 'module';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
