import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../auth/entity/user.entity';
import { UserService } from './service/user.service';
import { UserInfoDto } from './dto/user-info.dto';
import { JwtAuthenticationGuard } from 'src/auth/guards/jwt-authentication.guard';
import { UserInfoData } from './interface/user-info.interface';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
@UseGuards(JwtAuthenticationGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUser(@GetUser() user: User): Promise<UserInfoData> {
    return this.userService.getUser(user);
  }

  @Get('/:username')
  getUserByName(@Param('username') username: string): Promise<UserInfoData> {
    return this.userService.getUserByName(username);
  }

  @Patch()
  updateUserInfo(
    @Body() userInfoDto: UserInfoDto,
    @GetUser() user: User,
  ): Promise<UserInfoData> {
    return this.userService.updateUserProfile(user, userInfoDto);
  }
}
