import { RegisterUserHandler } from './RegisterUserHandler'
import {LoginUserHandler} from './LoginUserHandler'
import {UpdateUserHandler} from './UpdateUserHandler'
import {GetUsersHandler} from './GetUsersHandler'

export const CommandHandlers = [
  RegisterUserHandler,
  LoginUserHandler,
  UpdateUserHandler,
  GetUsersHandler,
]
