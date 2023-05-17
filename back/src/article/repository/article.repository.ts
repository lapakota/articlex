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
    const { cover, title, description, body } = articleDto;

    const article = new Article();

    article.cover = cover;
    article.title = title;
    article.description = description;
    article.body = body;
    article.creator = user.username;
    article.user = user;

    await article.save();

    delete article.user;
    return article;
  }

  async getUserArticles(user: User): Promise<Article[]> {
    const query = this.createQueryBuilder('article');

    query.where('article.creator = :username', { username: user.username });

    const articles = await query.getMany();
    return articles;
  }
}
