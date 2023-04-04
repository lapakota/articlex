import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Article } from '../../article/entity/article.entity';
import { UserInfo } from '../../user/entity/user-info.entity';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  username: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column()
  salt: string;

  @OneToMany(() => Article, (article) => article.user, { eager: true })
  article: Article[];

  @OneToOne(() => UserInfo, { eager: true })
  @JoinColumn()
  user_info: UserInfo;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
