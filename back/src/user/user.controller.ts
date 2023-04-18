import {
  Body,
  Controller,
  Get,
  Patch,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { User } from '../auth/entity/user.entity';
import { UserInfoData } from './interface/user-info.interface';
import { UserService } from './service/user.service';
import { diskStorage } from 'multer';
import { UserInfoDto } from './dto/user-info.dto';
import { editFileName, imageFileFilter } from 'utils/file-upload.utils';
import { JwtAuthenticationGuard } from 'src/guards/jwt-authentication.guard';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
@UseGuards(JwtAuthenticationGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUserInfo(@GetUser() user: User): Promise<UserInfoData> {
    return this.userService.getUser(user);
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
      userInfoDto.photo = file.originalname;
      userInfoDto.modified_photo = file.filename;
    }

    return this.userService.updateUserProfile(user, userInfoDto);
  }
}
