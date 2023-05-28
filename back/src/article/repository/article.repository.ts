import { Injectable } from '@nestjs/common';
import { User } from 'src/auth/entity/user.entity';
import { Between, DataSource, In, Repository } from 'typeorm';
import { ArticleDto } from '../dto/article.dto';
import { Article } from '../entity/article.entity';
import { ArticlesSearchParams } from '../interface/articles-search-params';
import { FeedSearchParams } from '../interface/feed-search-params';

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

  async getAllArticles(searchRequest: FeedSearchParams) {
    const articlesInfo = await this.findAndCount({
      where: {
        createdDate:
          searchRequest?.filters?.fromDate && searchRequest?.filters?.endDate
            ? Between(
                new Date(searchRequest.filters.fromDate),
                new Date(searchRequest.filters.endDate),
              )
            : undefined,
      },
      order: {
        createdDate: 'DESC',
      },
      skip: searchRequest.skip,
      take: searchRequest.take,
    });

    return articlesInfo;
  }

  async getArticlesBySubscriptions(
    user: User,
    searchRequest: FeedSearchParams,
  ) {
    const articlesInfo = await this.findAndCount({
      where: {
        creator: In(
          user.userInfo.subscriptions.map((x) => x.subscribedUsername),
        ),
        createdDate:
          searchRequest?.filters?.fromDate && searchRequest?.filters?.endDate
            ? Between(
                new Date(searchRequest.filters.fromDate),
                new Date(searchRequest.filters.endDate),
              )
            : undefined,
      },
      order: {
        createdDate: 'DESC',
      },
      skip: searchRequest.skip,
      take: searchRequest.take,
    });

    return articlesInfo;
  }

  async getUserArticles(username: string, searchRequest: ArticlesSearchParams) {
    const articlesInfo = await this.findAndCount({
      where: { creator: username },
      order: {
        createdDate: 'DESC',
      },
      skip: searchRequest.skip,
      take: searchRequest.take,
    });

    return articlesInfo;
  }
}
