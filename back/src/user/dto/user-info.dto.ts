import { ApiProperty } from '@nestjs/swagger';

export class UserInfoDto {
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
