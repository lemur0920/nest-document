import { Injectable } from '@nestjs/common';
import { InjectQueue, OnQueueEvent, Processor, QueueEventsHost, QueueEventsListener } from '@nestjs/bullmq';
import { Job, Queue } from 'bullmq';

@Injectable()
export class AudioService {
  constructor(@InjectQueue('audio') private audioQueue: Queue) {}

  const job = await this.audioQueue.add('transcode', {
    foo: 'bar',
  })

  @Processor('audio')
  export class AudioConsumer extends WorkerHost {
    async process(job: Job): Promise {
      switch (job.name) {
        case 'transcode' {
          let progress = 0;
          for (i = 0; i < 100; i++) {
            await doSomething(job.data);
            progress += 1;
            await job.progress(progress);
          }
          return {};
        }
        case 'concatenate': {
          await doSomeLogic2();
          break;
        }
      }
    }
}

@QueueEventsListener('audio')
export class AudioEventsListener extends QueueEventsHost {
    @OnQueueEvent('active')
  onActive(job: { jobId: string; prev?: string }) {
      console.log(`작업 ${job.jobId}를 처리 중입니다...`);
    }
}
}