import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
import {SendEmailEvent} from '../impl/SendEmailEvent'

@EventsHandler(SendEmailEvent)
export class SendEmailEventHandler implements IEventHandler<SendEmailEvent> {
    // tslint:disable-next-line:no-empty
    handle(event: SendEmailEvent) {}
}
