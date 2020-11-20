import {CanActivate, ExecutionContext, ForbiddenException, Injectable} from '@nestjs/common'
import {Reflector} from '@nestjs/core'
import {GqlExecutionContext} from '@nestjs/graphql'
import {User} from '@backend/users/src/entities'
import {PossessionType} from "@backend/roles/src";

@Injectable()
export class ResourceGuard  implements CanActivate {
  constructor(
      private readonly reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const resourceAccess  = this.reflector.get('ResourceAccess', context.getHandler())

    if (!resourceAccess) {
      return true
    }

    const {resource, action, possession} = resourceAccess

    const ctx = GqlExecutionContext.create(context)
    const {req} = ctx.getContext()

    const user: User = req.user
    if (req.user) {
      const {permissions } = user.role

      const checkPermission = permissions.find(
          permission =>
              permission.action === action && permission.resource === resource,
      )

      const checkPossession = user.role.possession === possession || user.role.possession === PossessionType.any

      if (!checkPermission || !checkPossession) {
        throw new ForbiddenException('The request is forbidden')
      }
    }

    return true
  }
}
