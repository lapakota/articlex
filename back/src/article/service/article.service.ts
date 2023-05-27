import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/auth/entity/user.entity';
import { UserRepository } from 'src/auth/repository/user.repository';
import { ArrayContains, In } from 'typeorm';
import { ArticleDto } from '../dto/article.dto';
import { Article } from '../entity/article.entity';
import {
  convertToListItem,
  convertToListItemWithAvatar,
} from '../helpers/article.helper';
import { ArticlesSearchParams as ArticlesSearchParams } from '../interface/articles-search-params';
import { ArticlesSearchResponse } from '../interface/articles-search-response';
import { FeedSearchParams } from '../interface/feed-search-params';
import { ArticleRepository } from '../repository/article.repository';

@Injectable()
export class ArticleService {
  constructor(
    private articleRepository: ArticleRepository,
    private userRepository: UserRepository,
  ) {}

  async createArticle(articleDto: ArticleDto, user: User): Promise<Article> {
    return this.articleRepository.createArticle(articleDto, user);
  }

  async getArticlesFeed(
    user: User,
    searchParams: FeedSearchParams,
  ): Promise<ArticlesSearchResponse> {
    const [articles, totalCount] = await this.articleRepository.getAllArticles(
      searchParams,
    );

    if (!articles) {
      throw new NotFoundException(`No articles for username`);
    }

    const allCreators = articles.map((x) => x.creator);
    const allCreatorsAvatars = (
      await this.userRepository.findBy({
        username: In(allCreators),
      })
    ).reduce(
      (acc, curr) => ({
        ...acc,
        [curr.username]: curr.userInfo.avatar,
      }),
      {},
    );

    const content = articles.map((article) =>
      convertToListItemWithAvatar(article, allCreatorsAvatars[article.creator]),
    );

    return { content, totalCount };
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

  async getArticlesByUsername(
    username: string,
    searchParams: ArticlesSearchParams,
  ): Promise<ArticlesSearchResponse> {
    const [articles, totalCount] = await this.articleRepository.getUserArticles(
      username,
      searchParams,
    );

    if (!articles) {
      throw new NotFoundException(`No articles for username ${username}`);
    }

    const user = await this.userRepository.findOne({ where: { username } });

    const content = articles.map((article) => convertToListItem(article, user));

    return { content, totalCount };
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
