import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength, Matches } from 'class-validator';
import { EMAIL_REGEXP, PASSWORD_REGEXP } from '../constants/auth.constants';

export class SignUpCredentialsDto {
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
  @MaxLength(35)
  @Matches(PASSWORD_REGEXP, {
    message: 'Password too weak',
  })
  password: string;

  @ApiProperty({ minimum: 4 })
  @IsString()
  @MinLength(4)
  @Matches(EMAIL_REGEXP, {
    message: 'Invalid email',
  })
  email: string;

  @ApiProperty({ minimum: 4 })
  @IsString()
  @MinLength(4)
  fullName: string;

  @ApiProperty({ minimum: 4 })
  @IsString()
  gender: string;
}
