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

    getUserArticlesKey(username: string | undefined) {
        return ['articlesList', username];
    },
};
