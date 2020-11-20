import {Args, Context, Query} from '@nestjs/graphql'
import {Injectable, UseGuards} from '@nestjs/common'
import {ResourceAccess, GqlAuthGuard, ResourceGuard} from '@backend/common'
import {ActionType, PossessionType} from '@backend/roles'
import {User} from '../entities'
import {GetUserCommand, LoginUserCommand} from '../commands/impl'
import {CommandBus} from '@nestjs/cqrs'
import {RegisterUserDto, TokenDto} from '../dto'

@Injectable()
export class UserQueries {
  constructor(
      private readonly commandBus: CommandBus,
  ) {}

  @Query('login')
  async login(@Args('input') input: RegisterUserDto): Promise<TokenDto> {
    const token = await this.commandBus.execute(
        new LoginUserCommand(
            input.email,
            input.password,
        ),
    )

    return token
  }

  @UseGuards(GqlAuthGuard, ResourceGuard)
  @ResourceAccess('profile', ActionType.read, PossessionType.own)
  @Query()
  async me(
      @Context('req')
          req: any,
  ): Promise<User> {
    return this.commandBus.execute(
        new GetUserCommand(req.user.id),
    )
  }

  @UseGuards(GqlAuthGuard, ResourceGuard)
  @ResourceAccess('profile', ActionType.read, PossessionType.any)
  @Query()
  async user(@Args('id') id: number) {
    return {}
  }

  @UseGuards(GqlAuthGuard, ResourceGuard)
  @ResourceAccess('profile', ActionType.read, PossessionType.any)
  @Query()
  users() {
    return {
      rows: [],
      count: 0,
    }
  }
}
