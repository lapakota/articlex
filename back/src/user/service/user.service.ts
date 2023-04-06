import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../../auth/entity/user.entity';
import { UserInfoDto } from '../dto/user-info.dto';
import { UserInfo } from '../entity/user-info.entity';
import { UserInfoData } from '../interface/user-info.interface';
import { UserInfoRepository } from '../repository/user-info.repository';

@Injectable()
export class UserService {
  constructor(private userInfoRepository: UserInfoRepository) {}

  async getUser(user: User): Promise<UserInfo> {
    const userInfo = await this.userInfoRepository.findOne({
      where: { id: user.user_info.id },
    });

    if (!userInfo) {
      throw new NotFoundException('User not found.');
    }
    return userInfo;
  }

  async updateUserProfile(
    user: User,
    userInfoDto: UserInfoDto,
  ): Promise<UserInfoData> {
    const userInfo = await this.getUser(user);
    userInfo.photo = userInfoDto.photo;
    userInfo.modified_photo = userInfoDto.modified_photo;

    await userInfo.save();
    return userInfo;
  }
}
