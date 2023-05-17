import { ArticleDto, Article } from 'src/api/contracts';
import axiosWithAuth from 'src/api/interceptors';

export const ArticleService = {
    async getMyArticles() {
        return axiosWithAuth.get<Article[]>('article/my/list');
    },

    async getArticleById(id: string) {
        return axiosWithAuth.get<Article>(`article/${id}`);
    },

    async getArticlesByUsername(username: string) {
        return axiosWithAuth.get<Article[]>(`article/${username}/list`);
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
