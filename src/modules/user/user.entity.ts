import { CoreEntity } from '@common/entities';
import { Column, Entity, Index } from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  STAFF = 'staff',
}

@Entity('users')
@Index(['email'], { unique: true })
@Index(['email', 'deletedAt'])
export class User extends CoreEntity {
  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ default: false })
  verified: boolean;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.STAFF })
  role: UserRole;
}
