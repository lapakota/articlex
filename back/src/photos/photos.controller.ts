import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'utils/file-upload.utils';
import { UploadRequestDto } from './dto/upload-request.dto';
import { UploadResponseDto } from './dto/upload-response.dto';

const TEN_MB = 10_485_760;

@ApiTags('Photos')
@Controller('photos')
export class PhotosController {
  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: TEN_MB,
      },
      fileFilter: imageFileFilter,
      storage: diskStorage({
        destination: function (_req, _file, cb) {
          cb(null, './uploads');
        },
        filename: editFileName,
      }),
    }),
  )
  uploadSingle(
    @UploadedFile() file,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Body() _request: UploadRequestDto,
  ): UploadResponseDto {
    const response = new UploadResponseDto();

    if (file) {
      response.originalName = file.originalname;
      response.photo = file.filename;
    }

    return response;
  }
}
