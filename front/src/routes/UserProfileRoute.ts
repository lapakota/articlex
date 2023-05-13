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
