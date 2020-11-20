import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User, Profile } from './entities'
import { CqrsModule } from '@nestjs/cqrs'
import { configs } from '@backend/configs'
import { PassportModule } from '@nestjs/passport'
import { Resolvers } from './resolvers'
import { CommandHandlers } from './commands/handlers'
import { EventHandlers } from './events/handlers'
import { ConfigModule, ConfigService } from '@nestjs/config'
import {SendGridModule} from '@ntegral/nestjs-sendgrid'
import {SendEmailSaga} from './sagas/SendEmailSaga'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: configs,
    }),
    TypeOrmModule.forFeature([
      User,
      Profile,
    ]),
    SendGridModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.get('sendgrid'),
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    CqrsModule,
  ],
  providers: [
    ...Resolvers,
    ...CommandHandlers,
    ...EventHandlers,
    SendEmailSaga,
  ],
})
export class UsersModule {}
