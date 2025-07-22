import { Controller, Get, Req } from "@nestjs/common";
import { AppService } from './app.service';

@Controller('cats')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get()
  findAll(@Req request: Request): string {
    return 'This action returns all cats';
  }
}
