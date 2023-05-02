export interface SignUpCredentialsDto {
    username: string;
    password: string;
}

export interface SignInCredentialsDto {
    username: string;
    password: string;
}

export interface SignInResponseDto {
    accessToken: string;
    refreshToken: string;
    user: User;
}

export interface RefreshTokensDto {
    refresh_token: string;
}

export interface Tokens {
    accessToken: string;
    refreshToken: string;
}

export interface UserInfo {
    id: number;
    photo: string;
    modified_photo: string;
}

export interface User {
    id: number;
    username: string;
    user_info: UserInfo;
}

export interface UpdateUserInfoDto {
    photo: File;
}

export interface Article {
    id: number;
    title: string;
    description: string;
    body: string;
    createdDate: string;
    updatedDate: string;
    userId: number;
}

export interface ArticleDto {
    title: string;
    description: string;
    body: string;
}


