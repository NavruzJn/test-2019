import { User } from './User'
import {PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, Entity, BaseEntity} from 'typeorm'

@Entity({ name: 'profile' })
export class Profile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  firstName: string

  @Column()
  lastName: string

  @OneToOne(type => User)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User
}
