import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from 'typeorm'
import {ActionType, PossessionType, RoleType} from '../enums'
import {ResourceType} from '../enums/ResourceType'

export interface Permission {
  resource: ResourceType
  action: ActionType
}

@Entity('role')
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column('jsonb', { default: [], nullable: true })
  permissions: Permission[] = []

  @Column('enum', { enum: PossessionType })
  possession: PossessionType

  @Column('enum', { enum: RoleType, unique: true })
  role: RoleType
}
