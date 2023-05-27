import { FeedSearchParams } from './contracts';

export const reactQueryHelper = {
    getAuthenticatedUserKey() {
        return ['authenticatedUser'];
    },

    getUserKey(username: string | undefined) {
        return ['user', username || ''];
    },

    getArticleKey(articleId: string | undefined) {
        return ['article', articleId];
    },

    getFeedKey(params: FeedSearchParams) {
        return ['feed', params];
    },

    getUserArticlesKey(username: string | undefined) {
        return ['articlesList', username];
    },
};
