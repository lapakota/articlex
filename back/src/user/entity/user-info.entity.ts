import { Subscription } from 'src/subscription/entity/subscription.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class UserInfo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  fullName: string;

  @Column({ type: 'varchar' })
  gender: string;

  @Column({ type: 'varchar', nullable: true })
  avatar: string;

  @OneToMany(() => Subscription, (subscription) => subscription.subscriber, {
    eager: true,
  })
  subscriptions: Subscription[];
}
