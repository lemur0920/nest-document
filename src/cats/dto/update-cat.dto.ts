import { AdditionalCatInfo, CreateCatDto } from './create-cat.dto';
import { IntersectionType, OmitType, PartialType } from '@nestjs/mapped-types';

// CreateCatDto의 필드들을 optional로 생성
// export class UpdateCatDto extends PartialType(CreateCatDto) {}

// 모든 속성을 선택한 후 특정 키 제거하여 타입 생성
// export class UpdateCatDto extends OmitType(CreateCatDto, ['name'] as const) {}

// 두 타입을 하나의 새로운 타입(클래스)으로 결합함.
export class UpdateCatDto extends IntersectionType(
  CreateCatDto,
  AdditionalCatInfo,
) {}

// 타입 매핑 유틸리티 함수는 합성이 가능하다!
export class UpdateCatDto extends PartialType(
  OmitType(CreateCatDto, ['name'] as const),
) {}
