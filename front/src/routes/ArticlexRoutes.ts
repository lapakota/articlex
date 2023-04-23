export type UserProfileRouteParams = {
    userId: string;
};
export class UserProfileRoute {
    public static readonly baseRoute = '/UserProfile';
    public static readonly route = '/UserProfile/:userId';
    public static getHref(userId: string): string {
        return `/UserProfile/${userId}`;
    }
}

export class UserSettingsRoute {
    public static readonly baseRoute = '/Settings';
    public static readonly route = '/Settings';
    public static getHref(): string {
        return '/Settings';
    }
}

export class AuthRoute {
    public static readonly baseRoute = '/Auth';
    public static readonly route = '/Auth';
    public static getHref(): string {
        return '/Auth';
    }
}
