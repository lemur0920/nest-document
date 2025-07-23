import { Injectable } from '@nestjs/common';
import { ApiConfigService } from './common/app-config.service';

@Injectable()
export class AppService {
  constructor(apiConfigService: ApiConfigService) {
    if (apiConfigService.isAuthEnabled) {
      // 인증이 활성화 된 경우
    }
  }
  getHello(): string {
    return 'Hello World!';
  }
}
