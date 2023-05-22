import { ApiProperty } from '@nestjs/swagger';

export class UploadForArticleResponseDto {
  @ApiProperty({
    required: true,
  })
  success: number;

  @ApiProperty({
    required: true,
  })
  file: {
    url: string;
    originalName: string;
  };
}
