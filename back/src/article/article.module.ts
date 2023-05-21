import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/auth/repository/user.repository';
import { ArticleController } from './article.controller';
import { Article } from './entity/article.entity';
import { ArticleRepository } from './repository/article.repository';
import { ArticleService } from './service/article.service';

@Module({
  imports: [TypeOrmModule.forFeature([Article])],
  controllers: [ArticleController],
  providers: [ArticleService, ArticleRepository, UserRepository],
})
export class ArticleModule {}
