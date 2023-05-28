import { FeedFilter } from 'src/features/Feed/FeedFilters/helpers/filter.helper';

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

    getFeedKey(filter: FeedFilter) {
        return ['feed', filter.fromDate, filter.endDate, filter.onlySubscriptions];
    },

    getUserArticlesKey(username: string | undefined) {
        return ['articlesList', username];
    },
};
