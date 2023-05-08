import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from 'src/auth/repository/user.repository';
import { User } from '../../auth/entity/user.entity';
import { UserInfoDto } from '../dto/user-info.dto';
import { UserInfo } from '../entity/user-info.entity';
import { UserInfoData } from '../interface/user-info.interface';
import { UserInfoRepository } from '../repository/user-info.repository';

@Injectable()
export class UserService {
  constructor(
    private userInfoRepository: UserInfoRepository,
    private userRepository: UserRepository,
  ) {}

  async getUser(user: User): Promise<UserInfoData> {
    const userFull = await this.userRepository.findOne({
      where: { username: user.username },
    });

    if (!userFull) {
      throw new NotFoundException('User not found.');
    }

    const userInfo: UserInfoData = {
      id: userFull.id,
      username: userFull.username,
      user_info: userFull.user_info,
    };

    return userInfo;
  }

  async getUserByName(username: string): Promise<UserInfoData> {
    const userFull = await this.userRepository.findOne({
      where: { username: username },
    });

    if (!userFull) {
      throw new NotFoundException('User not found.');
    }

    const userInfo: UserInfoData = {
      id: userFull.id,
      username: userFull.username,
      user_info: userFull.user_info,
    };

    return userInfo;
  }

  async getUserInfo(user: User): Promise<UserInfo> {
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
    const userInfo = await this.getUserInfo(user);

    userInfo.photo = userInfoDto.photo;
    userInfo.modified_photo = userInfoDto.modified_photo;

    await userInfo.save();

    const userData = this.getUser(user);
    return userData;
  }
}
