// TO DO SEND EMAIL EVENT SHOULD BE IN ROOT FOLDER TO BE USED IN OTHER MODULES
export class SendEmailEvent {
    constructor(public readonly email: string, public readonly subject: string, public readonly message: string) {}
}
