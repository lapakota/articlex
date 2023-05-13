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
