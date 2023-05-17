import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/auth/entity/user.entity';
import { ArticleDto } from '../dto/article.dto';
import { Article } from '../entity/article.entity';
import { ArticleRepository } from '../repository/article.repository';

@Injectable()
export class ArticleService {
  constructor(private articleRepository: ArticleRepository) {}

  async getAllArticles(user: User): Promise<Article[]> {
    return this.articleRepository.getUserArticles(user);
  }

  async createArticle(articleDto: ArticleDto, user: User): Promise<Article> {
    return this.articleRepository.createArticle(articleDto, user);
  }

  async getUserArticleById(id: number, user: User): Promise<Article> {
    const article = await this.articleRepository.findOne({
      where: { id, creator: user.username },
    });

    if (!article) {
      throw new NotFoundException(`Article with id ${id} is not found`);
    }
    return article;
  }

  async getArticleById(id: number): Promise<Article> {
    const article = await this.articleRepository.findOne({
      where: { id },
    });

    if (!article) {
      throw new NotFoundException(`Article with id ${id} is not found`);
    }
    return article;
  }

  async getArticlesByUsername(username: string): Promise<Article[]> {
    const articles = await this.articleRepository.find({
      where: { creator: username },
    });

    if (!articles) {
      throw new NotFoundException(`No articles for username ${username}`);
    }
    return articles;
  }

  async updateArticleById(id: number, articleDto: ArticleDto, user: User) {
    const article = await this.getUserArticleById(id, user);
    article.title = articleDto.title;
    article.description = articleDto.description;
    article.body = articleDto.body;

    await article.save();
    return article;
  }

  async deleteArticleById(id: number, user: User): Promise<void> {
    const article = await this.articleRepository.delete({
      id,
      creator: user.username,
    });

    if (article.affected === 0) {
      throw new NotFoundException(`Article with id ${id} is not found`);
    }
  }
}
