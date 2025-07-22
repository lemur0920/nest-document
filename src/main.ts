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
  app.useGlobalPipes(new ValidatationPipe());
  app.useGlobalGuards(new RolesGuard());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
