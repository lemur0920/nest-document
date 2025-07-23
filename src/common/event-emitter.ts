import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';

export class EventEmitter {
  constructor(private eventEmitter: EventEmitter2) {
    this.eventEmitter.emit(
      'order.created',
      new OrderCreateEvent({
        orderId: 1,
        payload: {},
      }),
    );
    @OnEvent('order.created')
  handleOrderCreatedEvent(payload: OrderCreatedEvent) {
      // OrderCreatedEvent 이벤트를 처리
    }
  }
}
