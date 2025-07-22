import {
  Body,
  Controller, DefaultValuePipe,
  Get,
  Param, ParseBoolPipe,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseFilters, UseGuards
} from '@nestjs/common';
import { CreateCatDto } from '../dto/create-cat.dto';
import { UpdateCatDto } from '../dto/UpdateCatDto';
import { CatsService } from './cats.service';
import { ValidatationPipe } from '../common/validation.pipe';
import { RolesGuard } from '../common/roles.guard';
import { Roles } from '../common/roles.decorator';

@Controller('cats')
@UseGuards(new RolesGuard())
export class CatsController {
  constructor(private catsService: CatsService) {}
  @Post()
  @Roles(['admin'])
  async create(@Body(new ValidatationPipe()) createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(
    @Query('activeOnly', new DefaultValuePipe(false), ParseBoolPipe) activeOnly: boolean,
    @Query('page', new DefaultValuePipe(0), parseIntPipe page: number),
  ) {
    return this.catsService.findAll({ activeOnly, page })
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id) {
    return this.catsService.findOne(id);
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
