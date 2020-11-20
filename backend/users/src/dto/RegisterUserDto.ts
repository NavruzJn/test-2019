import {RoleType} from '@backend/roles/src'
import { IsEmail, IsNotEmpty } from 'class-validator'

export class RegisterUserDto {
  @IsEmail() public readonly email: string
  @IsNotEmpty() public readonly password: string
  @IsNotEmpty() public readonly roleType: RoleType
}
