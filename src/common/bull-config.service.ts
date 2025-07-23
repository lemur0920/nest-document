import { Injectable } from '@nestjs/common';
import { BullRootModuleOptions, SharedBullConfigurationFactory } from '@nestjs/bullmq';

@Injectable()
class BullConfigService implements SharedBullConfigurationFactory {
  createSharedConfiguration(): BullRootModuleOptions {
    return {
      connection: {
        host: 'localhost',
        port: 6379,
      },
    };
  }
}