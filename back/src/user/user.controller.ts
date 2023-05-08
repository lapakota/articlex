import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../auth/entity/user.entity';
import { UserService } from './service/user.service';
import { diskStorage } from 'multer';
import { UserInfoDto } from './dto/user-info.dto';
import { editFileName, imageFileFilter } from 'utils/file-upload.utils';
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
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('photo', {
      limits: {
        fileSize: 2097152,
      },
      fileFilter: imageFileFilter,
      storage: diskStorage({
        destination: function (req, file, cb) {
          cb(null, './uploads');
        },
        filename: editFileName,
      }),
    }),
  )
  updateUserInfo(
    @UploadedFile() file,
    @Body() userInfoDto: UserInfoDto,
    @GetUser() user: User,
  ): Promise<UserInfoData> {
    if (file) {
      userInfoDto.avatar = file.filename;
    }

    return this.userService.updateUserProfile(user, userInfoDto);
  }
}
