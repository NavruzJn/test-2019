import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import {UpdateUserCommand} from '../impl'
import {Profile, User} from '../../entities'
import {getConnection} from 'typeorm'

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
    async execute(command: UpdateUserCommand): Promise<User> {
        const { firstName, lastName, id } = command
        const user = await getConnection()
            .getRepository(User)
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.profile', 'profile')
            .where({id})
            .getOne()

        if (!user.profile) {
            user.profile = new Profile()
            user.profile.user = user
        }

        user.profile.firstName = firstName
        user.profile.lastName = lastName

        await user.profile.save()

        return user
    }
}
