import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata): number {
    void metadata;
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException('Validataion failed');
    }
    return val;
  }
}
