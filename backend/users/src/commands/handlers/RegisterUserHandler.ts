import { CommandHandler, ICommandHandler, AggregateRoot } from '@nestjs/cqrs'
import {BadRequestException} from '@nestjs/common'
import {getConnection} from 'typeorm'
import {Role} from '@backend/roles/src/entities'
import { RegisterUserCommand } from '../impl'
import {User} from '../../entities'
import * as jwt from 'jsonwebtoken'
import {TokenDto} from '../../dto'
import {SendEmailEvent} from '../../events/impl'

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler extends AggregateRoot implements ICommandHandler<RegisterUserCommand> {
  constructor() {super()}
  async execute(command: RegisterUserCommand): Promise<TokenDto> {
    try {
      const { email, password, roleType } = command
      const newUser = new User()
      newUser.email = email
      newUser.password = password
      newUser.lastLogonAt = new Date()
      newUser.role = await getConnection()
          .getRepository(Role)
          .createQueryBuilder('role')
          .where({role: roleType})
          .getOne()
      await newUser.save()

      const accessToken = jwt.sign(JSON.stringify({
        id: newUser.id,
        email,
        role: newUser.role,
      }), 'secret')

      this.apply(new SendEmailEvent(email, 'Welcome', 'Bye'))
      return {
        expiresIn: 3600,
        accessToken,
        user: newUser,
        status: 200,
      }
    } catch (error) {
      throw new BadRequestException('User is not created')
    }
  }
}
