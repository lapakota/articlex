import { Gender } from 'src/types/gender';

export interface SignUpCredentialsDto {
    username: string;
    password: string;
    email: string;
    fullName: string;
    gender: Gender;
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
    email: string;
    fullName: string;
    gender: Gender;
    avatar?: string;
}

export interface User {
    id: string;
    username: string;
    userInfo: UserInfo;
}

export interface UpdateUserInfoDto {
    photo?: File;
    email?: string;
    fullName?: string;
    gender?: Gender;
}

export interface Article {
    id: string;
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
