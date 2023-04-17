import { Injectable } from '@nestjs/common';
import { User } from 'src/auth/entity/user.entity';
import { DataSource, Repository } from 'typeorm';
import { ArticleDto } from '../dto/article.dto';
import { Article } from '../entity/article.entity';

@Injectable()
export class ArticleRepository extends Repository<Article> {
  constructor(private dataSource: DataSource) {
    super(Article, dataSource.createEntityManager());
  }

  async createArticle(articleDto: ArticleDto, user: User): Promise<Article> {
    const { title, description, body } = articleDto;

    const article = new Article();

    article.title = title;
    article.description = description;
    article.body = body;
    article.user = user;

    await article.save();

    delete article.user;
    return article;
  }

  async getAllArticles(user: User): Promise<Article[]> {
    const query = this.createQueryBuilder('article');

    query.where('article.userId = :userId', { userId: user.id });

    const articles = await query.getMany();
    return articles;
  }
}
