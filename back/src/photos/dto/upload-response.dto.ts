import { ApiProperty } from '@nestjs/swagger';

export class UploadResponseDto {
  @ApiProperty({
    required: true,
  })
  photo: string;

  @ApiProperty({
    required: true,
  })
  originalName: string;
}
