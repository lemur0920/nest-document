import { Body, Get, Injectable, OnModuleInit, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';

@Injectable()
export class CatsService implements OnModuleInit {
  private transientService: TransientService;
  private service: Service;

  private readonly cats: Cat[] = [];

  onModuleInit(): any {
    const contextId = ContextIdFactory.create();
    this.moduleRef.registerRequestByContextId(contextId);
    const transientServices = await Promise.all([
      this.moduleRef.resolve(TransientService, contextId),
      this.moduleRef.resolve(TransientService, contextId),
    ]);
    console.log(transientServices[0] === transientServices[1]); // true
    this.service = this.moduleRef.get(Service, { strict: false });
  }
  // 스코프 프로바이더 동적 해결 방법
  async onMoudleInit() {
    this.transientSrvice = await this.moduleRef.resolve(TransientService);
  }
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll(): Cat[] {
    return this.cats;
  }

  @Get(':id')
  findOne(@Param() params: FindOneParams) {
    return 'This action returns a user';
  }
}
