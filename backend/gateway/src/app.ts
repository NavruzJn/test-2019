import { NestModule, MiddlewareConsumer, Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersModule } from '@backend/users'
import { RolesModule } from '@backend/roles'
import { APP_GUARD } from '@nestjs/core'
import { PassportModule } from '@nestjs/passport'
import { AccessGuard, ResourceGuard, JwtGuard } from '@backend/common'
import { GraphQLDate, GraphQLTime, GraphQLDateTime } from 'graphql-iso-date'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { configs } from '@backend/configs'
import * as dotenv from 'dotenv'

dotenv.config()

@Module({
  imports: [
    ConfigModule.forRoot({
      load: configs,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot({
      path: '/graphql',
      typePaths: [
        '../**/*.graphql',
      ],
      installSubscriptionHandlers: false,
      resolvers: {
        Date: GraphQLDate,
        Time: GraphQLTime,
        DateTime: GraphQLDateTime,
      },
      context: ({ req }) => ({ req }),
      formatError: error => {
        return error
      },
      playground: true,
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UsersModule,
    RolesModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AccessGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    },
  ],
})
export class ApplicationModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(JwtGuard).forRoutes('*')
  // }
}
