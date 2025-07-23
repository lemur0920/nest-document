import { PickType } from '@nestjs/mapped-types';
import { CreateCatDto } from './create-cat.dto';

// 해당 속성(age)만 선택
export class UpdateCatAgeDto extends PickType(CreateCatDto, ['age'] as const) {}
