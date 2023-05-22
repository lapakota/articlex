import { ApiProperty } from '@nestjs/swagger';

export class UploadForArticleRequestDto {
  @ApiProperty({
    type: 'file',
    properties: {
      image: {
        type: 'string',
        format: 'binary',
      },
    },
    required: true,
  })
  image: string;
}
