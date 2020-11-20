import { Injectable } from '@nestjs/common'
import { ICommand, ofType, Saga } from '@nestjs/cqrs'
import { Observable } from 'rxjs'
import { delay, map } from 'rxjs/operators'
import {SendEmailCommand} from '../commands/impl'
import {SendEmailEvent} from '../events/impl'

@Injectable()
export class SendEmailSaga {
    @Saga()
    sendEmail = (events$: Observable<any>): Observable<ICommand> => {
        return events$
            .pipe(
                ofType(SendEmailEvent),
                delay(1000),
                map((event: any) => {
                    return new SendEmailCommand(event.email, event.subject, event.message)
                }),
            )
    }
}
