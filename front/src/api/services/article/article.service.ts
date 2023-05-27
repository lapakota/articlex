import { ArticleDto, Article, ArticlesSearchParams, ArticlesSearchResponse, FeedSearchParams } from 'src/api/contracts';
import axiosWithAuth from 'src/api/interceptors';

export const ArticleService = {
    async getArticlesFeed(params?: FeedSearchParams) {
        return axiosWithAuth.get<ArticlesSearchResponse>('article/feed', { params });
    },

    async getArticleById(id: string) {
        return axiosWithAuth.get<Article>(`article/${id}`);
    },

    async getArticlesByUsername(username: string, params?: ArticlesSearchParams) {
        return axiosWithAuth.get<ArticlesSearchResponse>(`article/${username}/list`, { params });
    },

    async postNewArticle(data: ArticleDto) {
        return axiosWithAuth.post<Article>('article', data);
    },

    async updateArticle(id: string, data: ArticleDto) {
        return axiosWithAuth.patch<Article>(`article/${id}`, data);
    },

    async deleteArticle(id: string) {
        return axiosWithAuth.delete<Article>(`article/${id}`);
    },
};
