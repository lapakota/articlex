export type ArticleRouteParams = {
    articleId: string;
};

export class ArticleRoute { 
    public static readonly baseRoute = '/article/:articleId';
    public static readonly route = '/article/:articleId';
    public static getHref(articleId: string): string {
        return `/article/${articleId}`;
    }
}