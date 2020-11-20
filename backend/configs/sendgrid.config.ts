import { registerAs } from '@nestjs/config'

export default registerAs('sendgrid', () => ({
  apikey: process.env.SENDGRID_API_KEY,
}))
