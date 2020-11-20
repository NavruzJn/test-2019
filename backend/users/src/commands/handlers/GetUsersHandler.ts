import {CommandHandler, ICommandHandler} from '@nestjs/cqrs'
import {BadRequestException} from '@nestjs/common'
import {User} from '../../entities'
import {getConnection} from 'typeorm'
import {GetUserCommand} from '../impl'

@CommandHandler(GetUserCommand)
export class GetUsersHandler implements ICommandHandler<GetUserCommand> {
    async execute(command: GetUserCommand): Promise<User | User[]> {
        try {
            const { id } = command
            const queryBuilder = await getConnection()
                .getRepository(User)
                .createQueryBuilder('user')
                .leftJoinAndSelect('user.profile', 'profile')
            if (!id) {
                queryBuilder.where(id)
                return await queryBuilder.getOne()
            }
            return await queryBuilder.getMany()
        } catch (error) {
            throw new BadRequestException('User is not created')
        }
    }
}
