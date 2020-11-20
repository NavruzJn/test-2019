import {Args, Context, Mutation} from '@nestjs/graphql'
import {RegisterUserDto, UpdateProfileDto, TokenDto} from '../dto'
import {CommandBus} from '@nestjs/cqrs'
import {RegisterUserCommand, UpdateUserCommand} from '../commands/impl'
import {Injectable, UseGuards} from '@nestjs/common'
import {ResourceAccess, GqlAuthGuard, JwtGuard} from '@backend/common'
import {ActionType, PossessionType} from '@backend/roles'
import {User} from '../entities'
import {ResourceGuard} from '@backend/common'

@Injectable()
export class UserMutations {
  constructor(
      private readonly commandBus: CommandBus,
  ) {}

  @Mutation('register')
  async register(
      @Args('input')
          input: RegisterUserDto,
  ): Promise<TokenDto> {
    const token = await this.commandBus.execute(
        new RegisterUserCommand(
            input.email,
            input.password,
            input.roleType,
        ),
    )

    return token
  }

  @UseGuards(GqlAuthGuard, ResourceGuard)
  @ResourceAccess('profile', ActionType.update, PossessionType.own)
  @Mutation('updateProfile')
  async updateProfile(
      @Args('input')
          input: UpdateProfileDto,
      @Context('req')
          req: any,
  ): Promise<User> {
    return this.commandBus.execute(
        new UpdateUserCommand(
            req.user.id,
            input.firstName,
            input.lastName,
        ),
    )
  }
}
