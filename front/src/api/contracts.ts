import { ArticleBody } from 'src/types/ArticleBody';
import { Gender } from 'src/types/Gender';

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

export interface Subscription {
    id: string;
    subscribedUsername: string;
    subscribedUserAvatar?: string;
}

export interface UserInfo {
    id: string;
    email: string;
    fullName: string;
    gender: Gender;
    avatar?: string;
    subscriptions: Subscription[];
}

export interface User {
    id: string;
    username: string;
    userInfo: UserInfo;
}

export interface UpdateUserInfoDto {
    avatar?: string;
    email?: string;
    fullName?: string;
    gender?: Gender;
}

export interface Article {
    id: string;
    cover: string;
    title: string;
    description: string;
    body: ArticleBody;
    createdDate: string;
    updatedDate: string;
    creator: string;
}

export interface ArticleListItem {
    id: string;
    cover: string;
    title: string;
    description: string;
    createdDate: string;
    updatedDate: string;

    creator: string;
    creatorAvatar?: string;
}

export interface ArticlesSearchResponse {
    content: ArticleListItem[];
    totalCount: number;
}

export interface ArticlesSearchParams {
    skip?: number;
    take?: number;
}

export interface ArticleDto {
    cover: string;
    title: string;
    description: string;
    body: ArticleBody;
}

export interface UploadedPhoto {
    originalName: string;
    photo: string;
}
