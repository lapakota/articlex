import { User } from 'src/auth/entity/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Subscription extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  subscribedUsername: string;

  @Column({ type: 'varchar', nullable: true })
  subscribedUserAvatar: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'subscriber_id' })
  subscriber: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'target_id' })
  target: User;
}
