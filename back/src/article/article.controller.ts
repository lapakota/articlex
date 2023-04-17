import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { User } from 'src/auth/entity/user.entity';
import { ArticleDto } from './dto/article.dto';
import { Article } from './entity/article.entity';
import { ArticleService } from './service/article.service';

@ApiTags('Article')
@ApiBearerAuth()
@Controller('article')
@UseGuards(AuthGuard())
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Get('my')
  getAllArticles(@GetUser() user: User): Promise<Article[]> {
    return this.articleService.getAllArticles(user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createArticle(
    @Body() articleDto: ArticleDto,
    @GetUser() user: User,
  ): Promise<Article> {
    return this.articleService.createArticle(articleDto, user);
  }

  @Get('/:id')
  getArticleById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Article> {
    return this.articleService.getArticleById(id, user);
  }

  @Patch('/:id')
  updateArticleById(
    @Param('id', ParseIntPipe) id: number,
    @Body() articleDto: ArticleDto,
    @GetUser() user: User,
  ): Promise<Article> {
    return this.articleService.updateArticleById(id, articleDto, user);
  }

  @Delete('/:id')
  deleteArticleById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.articleService.deleteArticleById(id, user);
  }
}
