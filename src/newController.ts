import { Sse } from '@nestjs/common';
import { Observable } from 'rxjs';

export class NewController {
  const eventSource = new EventSource('/sse');
  eventSource.onmessage = ({ data }) => {
    console.log('새 메시지', JSON.parse(data));
  }
  @Sse('sse')
  sse(): Observable<any {
  }
  return interval(1000).pipe(map((_) => ({ data: {hello: 'world'} })));

}