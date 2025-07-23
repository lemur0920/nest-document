import { Inject, Injectable, Scope } from '@nestjs/common';
import { MODULE_OPTIONS_TOKEN } from './config.module-definition';

@Injectable({ scope: Scope.REQUEST })
export class ConfigService {
  private readonly envConfig: EnvConfig:

  constructor(@Inject(MODULE_OPTIONS_TOKEN) private options: ConfigModuleOptions) {}

  get(key: string): string {
    return this.envConfig[key];
  }
}