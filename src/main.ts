import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter, HttpExceptionFilter } from './common/http-exception.filter';
import { ValidatationPipe } from './common/validation.pipe';
import * as process from 'process';
import { RolesGuard } from './common/roles.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.useGlobalPipes(
    new ValidatationPipe({
      disableErrorMessages: true,
      whitelist: true //, 검증 클래스에 데코레이터가 없는 속성이 자동 제거 됨
      forbidNonWhitelisted: true, // 화이트리스트에 포함되지 않은 속성이 있을 때 요청 처리 중단하고 사용자에게 오류 응답 반환
      transform: true // 페이로드를 DTO 클래스에 맞는 타입의 객체로 자동 변환
    }),
  app.useGlobalGuards(new RolesGuard());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
