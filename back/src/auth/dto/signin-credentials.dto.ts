import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { PASSWORD_REGEXP } from '../constants/auth.constants';

export class SignInCredentialsDto {
  @ApiProperty({ minimum: 4, maximum: 20 })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @ApiProperty({
    minimum: 6,
    maximum: 20,
    description:
      'At least 1 capital, 1 small, 1 special character and 1 number',
  })
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Matches(PASSWORD_REGEXP, {
    message: 'Password too weak',
  })
  password: string;
}
