import { ApiProperty } from '@nestjs/swagger';

export class UserInfoDto {
  // TODO Разобраться как с фронта загрузить файл
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
  photo: string;

  @ApiProperty({
    required: false,
  })
  avatar: string;

  @ApiProperty({
    required: false,
  })
  email: string;

  @ApiProperty({
    required: false,
  })
  fullName: string;

  @ApiProperty({
    required: false,
  })
  gender: string;
}
