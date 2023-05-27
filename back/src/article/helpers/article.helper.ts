import { User } from 'src/auth/entity/user.entity';
import { Article } from '../entity/article.entity';
import { ArticleListItem } from '../interface/article-list-item.interface';

export function convertToListItem(
  article: Article,
  user: User,
): ArticleListItem {
  return {
    id: article.id,
    title: article.title,
    description: article.description,
    cover: article.cover,
    createdDate: article.createdDate,
    updatedDate: article.updatedDate,

    creator: article.creator,
    creatorAvatar: user.userInfo.avatar,
  };
}

export function convertToListItemWithAvatar(
  article: Article,
  avatar?: string,
): ArticleListItem {
  return {
    id: article.id,
    title: article.title,
    description: article.description,
    cover: article.cover,
    createdDate: article.createdDate,
    updatedDate: article.updatedDate,

    creator: article.creator,
    creatorAvatar: avatar,
  };
}
