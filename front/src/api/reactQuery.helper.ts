export const reactQueryHelper = {
    getAuthenticatedUserKey() {
        return ['authenticatedUser'];
    },

    getUserKey(username: string | undefined) {
        return ['user', username || ''];
    },
};
