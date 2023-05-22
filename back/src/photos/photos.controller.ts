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
import { UploadForArticleRequestDto } from './dto/upload-for-article-request.dto';
import { UploadForArticleResponseDto } from './dto/upload-for-article-response.dto';
import { UploadRequestDto } from './dto/upload-request.dto';
import { UploadResponseDto } from './dto/upload-response.dto';

const TWENTY_MB = 20_971_520;

@ApiTags('Photos')
@Controller('photos')
export class PhotosController {
  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: TWENTY_MB,
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

  @Post('upload/forArticle')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('image', {
      limits: {
        fileSize: TWENTY_MB,
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
  uploadForArticle(
    @UploadedFile() file,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Body() _request: UploadForArticleRequestDto,
  ): UploadForArticleResponseDto {
    const response = new UploadForArticleResponseDto();

    if (file) {
      response.success = 1;
      response.file = {
        url: `/images/${file.filename}`,
        originalName: file.originalname,
      };
    } else {
      response.success = 0;
      response.file = {
        url: '',
        originalName: '',
      };
    }

    return response;
  }
}
