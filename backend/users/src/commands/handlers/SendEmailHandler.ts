import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import {SendEmailCommand} from '../impl'
import {SendGridService} from '@ntegral/nestjs-sendgrid'

@CommandHandler(SendEmailCommand)
export class UpdateUserHandler implements ICommandHandler<SendEmailCommand> {
    constructor(private readonly sendGrid: SendGridService) {
    }
    async execute(command: SendEmailCommand) {
        const { email, subject, message } = command
        await this.sendGrid.send({
            to: email,
            from: process.env.SUPPORT_EMAIL,
            subject,
            text: message,
        })
    }
}
