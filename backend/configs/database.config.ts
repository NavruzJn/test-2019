import { registerAs } from '@nestjs/config'
import connectDbOptions from '../ormconfig'

export default registerAs('database', () => {
  return connectDbOptions
})
