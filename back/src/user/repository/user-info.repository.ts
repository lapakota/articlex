import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserInfo } from '../entity/user-info.entity';

@Injectable()
export class UserInfoRepository extends Repository<UserInfo> {
  constructor(private dataSource: DataSource) {
    super(UserInfo, dataSource.createEntityManager());
  }
}
