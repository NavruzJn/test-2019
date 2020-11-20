import {MigrationInterface, QueryRunner} from 'typeorm'
import {Role} from '../src/entities'
import {ActionType, PossessionType, RoleType} from '../src/enums'
import {ResourceType} from '../src/enums/ResourceType'

export class CreateDefaultRoles1605713824483 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager
            .createQueryBuilder()
            .insert()
            .into(Role)
            .values([
                {
                    name: 'support',
                    role: RoleType.support,
                    possession: PossessionType.any,
                    permissions: [
                        {
                            resource: ResourceType.profile,
                            action: ActionType.create,
                        },
                        {
                            resource: ResourceType.profile,
                            action: ActionType.update,
                        },
                        {
                            resource: ResourceType.profile,
                            action: ActionType.delete,
                        },
                        {
                            resource: ResourceType.profile,
                            action: ActionType.read,
                        },
                    ],
                },
                {
                    name: 'user',
                    role: RoleType.user,
                    possession: PossessionType.own,
                    permissions: [
                        {
                            resource: ResourceType.profile,
                            action: ActionType.create,
                        },
                        {
                            resource: ResourceType.profile,
                            action: ActionType.update,
                        },
                        {
                            resource: ResourceType.profile,
                            action: ActionType.delete,
                        },
                        {
                            resource: ResourceType.profile,
                            action: ActionType.read,
                        },
                    ],
                },
            ])
            .execute()
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.clearTable('role')
    }
}
