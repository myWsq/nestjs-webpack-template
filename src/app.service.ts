import { Injectable } from '@nestjs/common';
import { sayHello } from '@lib/utils';

@Injectable()
export class AppService {
  getHello(): string {
    return sayHello();
  }
}
