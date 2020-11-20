export class SendEmailEvent {
    constructor(public readonly email: string, public readonly subject: string, public readonly message: string) {}
}
