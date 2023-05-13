import { ApiProperty } from '@nestjs/swagger';

export class UploadRequestDto {
  @ApiProperty({
    type: 'file',
    properties: {
      file: {
        type: 'string',
        format: 'binary',
      },
    },
    required: false,
  })
  file: string;
}
