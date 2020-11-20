import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  OneToOne,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
  BaseEntity,
  CreateDateColumn,
} from 'typeorm'
import bcrypt from 'bcrypt'
import { Profile } from './Profile'
import { Role } from '@backend/roles/src/entities'

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({unique: true})
  email: string

  @Column()
  password: string

  @CreateDateColumn({ type: 'timestamp', name: 'registeredAt' })
  registeredAt: Date

  @Column()
  lastLogonAt: Date

  @OneToOne(type => Profile)
  @JoinColumn({ name: 'profileId', referencedColumnName: 'id' })
  profile: Profile

  @ManyToOne(type => Role)
  @JoinColumn()
  role: Role

  @BeforeInsert()  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10)
  }
}
