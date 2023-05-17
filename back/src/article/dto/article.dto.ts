import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class ArticleDto {
  @IsString()
  cover: string;

  @ApiProperty({
    minimum: 4,
    maximum: 100,
  })
  @IsString()
  @MinLength(4)
  @MaxLength(100)
  title: string;

  @ApiProperty({
    minimum: 4,
    maximum: 400,
  })
  @IsString()
  @MinLength(4)
  @MaxLength(400)
  description: string;

  @ApiProperty()
  @IsString()
  body: string;
}
