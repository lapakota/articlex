import { ArticleListItem } from './article-list-item.interface';

export interface ArticlesSearchResponse {
  content: ArticleListItem[];
  totalCount: number;
}
