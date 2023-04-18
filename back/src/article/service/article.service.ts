import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/auth/entity/user.entity';
import { ArticleDto } from '../dto/article.dto';
import { Article } from '../entity/article.entity';
import { ArticleRepository } from '../repository/article.repository';

@Injectable()
export class ArticleService {
  constructor(private articleRepository: ArticleRepository) {}

  async getAllArticles(user: User): Promise<Article[]> {
    return this.articleRepository.getAllArticles(user);
  }

  async createArticle(articleDto: ArticleDto, user: User): Promise<Article> {
    return this.articleRepository.createArticle(articleDto, user);
  }

  async getArticleById(id: number, user: User): Promise<Article> {
    const article = await this.articleRepository.findOne({
      where: { id, userId: user.id },
    });

    if (!article) {
      throw new NotFoundException(`Article with id ${id} is not found`);
    }
    return article;
  }

  async updateArticleById(id: number, articleDto: ArticleDto, user: User) {
    const article = await this.getArticleById(id, user);
    article.title = articleDto.title;
    article.description = articleDto.description;
    article.body = articleDto.body;

    await article.save();
    return article;
  }

  async deleteArticleById(id: number, user: User): Promise<void> {
    const article = await this.articleRepository.delete({
      id,
      userId: user.id,
    });

    if (article.affected === 0) {
      throw new NotFoundException(`Article with id ${id} is not found`);
    }
  }
}
