import {User} from '../entities'

export class TokenDto {
    public readonly expiresIn: 3600
    public readonly accessToken: string
    public readonly user: User
    public readonly status: 200
}
