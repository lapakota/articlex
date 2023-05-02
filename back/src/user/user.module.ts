import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/entity/user.entity';
import { UserRepository } from 'src/auth/repository/user.repository';
import { UserInfo } from './entity/user-info.entity';
import { UserInfoRepository } from './repository/user-info.repository';
import { UserService } from './service/user.service';
import { UserController } from './user.controller';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
    TypeOrmModule.forFeature([UserInfo, User]),
  ],
  controllers: [UserController],
  providers: [UserService, UserInfoRepository, UserRepository],
})
export class UserModule {}
