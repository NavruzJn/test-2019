import {RoleType} from '@backend/roles/src'

export class RegisterUserCommand {
  constructor(
    public readonly email: string,
    public readonly password: string,
    public readonly roleType: RoleType,
  ) {}
}
