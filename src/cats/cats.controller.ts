import {
  Body,
  Controller,
  DefaultValuePipe, FileTypeValidator,
  Get, MaxFileSizeValidator,
  Param,
  ParseBoolPipe, ParseFilePipe, ParseFilePipeBuilder,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Put,
  Query, Req, SetMetadata, UploadedFile, UploadedFiles,
  UseGuards, UseInterceptors, UsePipes
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
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { FileSizeValidationPipe } from '../common/file-upload';

@Roles(['user'])
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

  @Post()
  @Roles(Role.Admin)
  @UsePipes(new ValidatationPipe({ transform: true }))
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
      // 기본적으로 모든 경로 매개변수와 쿼리 매개변수는 네트워크를 통해 string으로 전달 됨. 위에 id를 number로 지정했기 때문에
      // validatationPipe는 문자열 식별자를 숫자로 자동 변환하려고 시도함.
      console.log(typeof id === 'number'); // true
    return 'This action returns a user';
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Query('sort', ParseBoolPipe) sort: boolean,
  ) {
      console.log(typeof id === 'number'); // true
      console.log(typeof sort === 'boolean'); // true
      return 'this action returns a user';
  }

  @Get()
  @Roles('admin')
  @SetMetadata('roles', ['admin']) // 저수준 방식
  async findOne(
    @User(new ValidatationPipe({ validationCustomDecorators: true }))
    user: UserEntity,
  ) {
    const roles = this.reflector.getAllAndOverride(Roles, [context.getHandler(), context.getClass()]);
    // 병합
    const roles = this.reflector.getAllAndMerge(Roles, [context.getHandler(), context.getClass()]);
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
  @Get()
  findAll(@Req() request: Request, @Session() session: Record) {
    session.visits = session.visits ? session.visits + 1 | 1;
    request.session.visits = request.session.visits ? request.session.visits + 1 : 1;
}

  @Post('upload')
  @UseInterceptors(FilesFieldsInterceptor([
    { name: 'avatar', maxCount: 1 },
    { name: 'background', maxCount: 1 },
  ]))
  uploadFile(@UploadedFiles() files: { avatar?: Express.Multer.File[], background?: Express.Multer.File[] }) {
    console.log(files);
}




}
