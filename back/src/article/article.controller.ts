import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entity/user.entity';
import { JwtAuthenticationGuard } from 'src/auth/guards/jwt-authentication.guard';
import { ArticleDto } from './dto/article.dto';
import { Article } from './entity/article.entity';
import { ArticlesSearchParams } from './interface/articles-search-params';
import { ArticlesSearchResponse } from './interface/articles-search-response';
import { FeedSearchParams } from './interface/feed-search-params';
import { ArticleService } from './service/article.service';

@ApiTags('Article')
@ApiBearerAuth()
@Controller('article')
@UseGuards(JwtAuthenticationGuard)
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createArticle(
    @Body() articleDto: ArticleDto,
    @GetUser() user: User,
  ): Promise<Article> {
    return this.articleService.createArticle(articleDto, user);
  }

  @Get('/feed')
  getArticlesFeed(
    @GetUser() user: User,
    @Query() searchParams: FeedSearchParams,
  ): Promise<ArticlesSearchResponse> {
    return this.articleService.getArticlesFeed(user, searchParams);
  }

  @Get('/:id')
  getArticleById(@Param('id', ParseIntPipe) id: number): Promise<Article> {
    return this.articleService.getArticleById(id);
  }

  @Get('/:username/list')
  getArticlesByUsername(
    @Param('username') username: string,
    @Query() searchParams: ArticlesSearchParams,
  ): Promise<ArticlesSearchResponse> {
    return this.articleService.getArticlesByUsername(username, searchParams);
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
