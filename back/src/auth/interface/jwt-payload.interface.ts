import { UserInfo } from '../../user/entity/user-info.entity';

export interface JwtPayload {
  id: number;
  username: string;
  userInfo: UserInfo;
}
