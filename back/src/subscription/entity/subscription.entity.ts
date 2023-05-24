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
  subscriberUsername: string;

  @Column({ type: 'varchar' })
  subscribedUsername: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'subscriber_id' })
  subscriber: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'target_id' })
  target: User;
}
