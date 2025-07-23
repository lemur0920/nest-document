import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): any {
    // "value"는 파일의 속성과 메타데이터를 포함하는 객체
    const oneKb = 1000;
    return value.size < oneKb;
  }
}