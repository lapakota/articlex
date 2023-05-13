import { Module } from '@nestjs/common';
import { PhotosController } from './photos.controller';

@Module({
  controllers: [PhotosController],
})
export class PhotosModule {}
