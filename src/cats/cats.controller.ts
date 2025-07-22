import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards, UseInterceptors
} from '@nestjs/common';
import { CreateCatDto } from '../dto/create-cat.dto';
import { UpdateCatDto } from '../dto/UpdateCatDto';
import { CatsService } from './cats.service';
import { ValidatationPipe } from '../common/validation.pipe';
import { RolesGuard } from '../common/roles.guard';
import { Roles } from '../common/roles.decorator';
import { Role } from './role.enum';
import { LoggingInterceptor } from '../common/logging.interceptor';
import { User } from '../common/user.decorator';
import { Auth } from '../common/auth.decorator';

@Controller('cats')
@UseGuards(new RolesGuard())
@UseInterceptors(LoggingInterceptor)
export class CatsController {
  constructor(private catsService: CatsService) {}
  @Post()
  @Roles(Role.Admin)
  @RequiredPermissions(Permission.CREATED_CAT)
  create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(
    @Query('activeOnly', new DefaultValuePipe(false), ParseBoolPipe) activeOnly: boolean,
    @Query('page', new DefaultValuePipe(0), parseIntPipe page: number),
  ) {
    return this.catsService.findAll({ activeOnly, page })
  }

  @Get('users')
  @Auth('admin')
  findAllUsers() {}

  @Get()
  async findOne(
    @User(new ValidatationPipe({ validationCustomDecorators: true }))
    user: UserEntity,
  ) {
    console.log(user);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return `${id} 고양이를 반환합니다.`;
  }

  @Get(':id')
  findOne(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.catsService.findAll(uuid);
  }
}
