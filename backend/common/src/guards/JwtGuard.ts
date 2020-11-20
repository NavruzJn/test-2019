import {Injectable, ExecutionContext, UnauthorizedException} from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { GqlExecutionContext } from '@nestjs/graphql'

@Injectable()
export class JwtGuard extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'secret',
        })
    }

    async validate(payload: any) {
        if (!payload) {
            throw new UnauthorizedException()
        }
        return payload
    }
}
