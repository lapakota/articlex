export interface ArticleListItem {
  id: number;
  cover: string;
  title: string;
  description: string;
  createdDate: Date;
  updatedDate: Date;

  creator: string;
  creatorAvatar?: string;
}
