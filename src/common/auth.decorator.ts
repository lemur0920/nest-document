import { Role } from '../cats/role.enum';
import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { RolesGuard } from './roles.guard';

export function Auth(...roles: Role[]) {
  // 여러개의 역할을 지정할 수도 있어서 스프레드 연산자 사용
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(AuthGuard, RolesGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}
