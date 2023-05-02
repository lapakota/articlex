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
    public static readonly baseRoute = '/deed';
    public static readonly route = '/feed';
    public static getHref(): string {
        return '/feed';
    }
}

export class AuthRoute {
    public static readonly baseRoute = '/Auth';
    public static readonly route = '/Auth';
    public static getHref(): string {
        return '/Auth';
    }
}
