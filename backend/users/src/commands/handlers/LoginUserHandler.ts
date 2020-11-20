import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import {NotFoundException, UnauthorizedException} from '@nestjs/common'
import bcrypt from 'bcrypt'
import {LoginUserCommand} from '../impl'
import {User} from '../../entities'
import {getConnection} from 'typeorm'
import {TokenDto} from '../../dto'
import * as jwt from 'jsonwebtoken'

@CommandHandler(LoginUserCommand)
export class LoginUserHandler implements ICommandHandler<LoginUserCommand> {
    async execute(command: LoginUserCommand): Promise<TokenDto> {
        const { email, password } = command
        const user = await getConnection()
            .getRepository(User)
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.profile', 'profile')
            .where({email})
            .getOne()

        if (!user) {
            throw new NotFoundException('User not found')
        }

        const passwordCheck = bcrypt.compare(password, user.password)

        if(!passwordCheck) {
            throw new UnauthorizedException('Incorrect credentials')
        }
        user.lastLogonAt = new Date()
        await user.save()

        const accessToken = jwt.sign(JSON.stringify({
            id: user.id,
            email,
            role: user.role,
        }), 'secret') // TO DO move JWT configs to config folder
        return {
            expiresIn: 3600,
            accessToken,
            user,
            status: 200,
        }
    }
}
