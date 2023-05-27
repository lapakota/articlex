export type ArticleEditorRouteParams = {
    articleId: string | undefined;
};

export class ArticleEditorRoute {
    public static readonly baseRoute = '/articleEditor/:articleId?';
    public static readonly route = '/articleEditor/:articleId?';
    public static getHref(articleId?: string): string {
        if (!articleId) return '/articleEditor';
        return `/articleEditor/${articleId}`;
    }
}
