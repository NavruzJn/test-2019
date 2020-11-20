import { registerAs } from '@nestjs/config'

export default registerAs('auth', () => {
    return {
        secret: process.env.SECRET_JWT_KEY,
        signOptions: {
            expiresIn: +process.env.JWT_EXPIRES_IN,
        },
    }
})
