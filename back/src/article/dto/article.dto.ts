import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class ArticleDto {
  @ApiProperty({
    minimum: 4,
    maximum: 30,
  })
  @IsString()
  @MinLength(4)
  @MaxLength(30)
  title: string;

  @ApiProperty({
    minimum: 4,
    maximum: 150,
  })
  @IsString()
  @MinLength(4)
  @MaxLength(150)
  description: string;

  @ApiProperty()
  @IsString()
  body: string;
}
