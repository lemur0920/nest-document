export abstract class FileValidator<TValidationOptions> {
  constructor(protected readonly validationiOptions: TValidationOptions) {}

  /**
   * 생성자로 전달된 옵션에 따라 파일이 유효한지 여부를 나타냅니다.
   * @param file 요청 객체의 파일
   */
  abstract isValid(file?: any): boolean | Promise<boolean>;

  /**
   * 검증이 실패할 경우 에러 메시지를 생성합니다.
   * @param file 요청 객체의 파일
   */
  abstract buildErrorMessage(file: any): string;
}
