export type UserProfileRouteParams = {
    username: string;
};
export class UserProfileRoute {
    public static readonly baseRoute = '/userProfile/:username';
    public static readonly route = '/userProfile/:username';
    public static getHref(username: string): string {
        return `/userProfile/${username}`;
    }
}

export class UserSettingsRoute {
    public static readonly baseRoute = '/settings';
    public static readonly route = '/settings';
    public static getHref(): string {
        return '/settings';
    }
}

export class FeedRoute {
    public static readonly baseRoute = '/feed';
    public static readonly route = '/feed';
    public static getHref(): string {
        return '/feed';
    }
}

export type AuthRouteParams = {
    authType: 'signin' | 'signup';
};
export class AuthRoute {
    public static readonly baseRoute = '/auth/:authType';
    public static readonly route = '/auth/:authType';
    public static getHref(authType: 'signin' | 'signup'): string {
        return `/auth/${authType}`;
    }
}
