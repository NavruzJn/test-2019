import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common'
import {Reflector} from '@nestjs/core'

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const withAuthAccess = this.reflector.get('AuthAccess', context.getHandler())

    if (!withAuthAccess) {
      return true
    }

    const [, , ctx, req] = context.getArgs()
    return ctx.user || req.user
  }
}
