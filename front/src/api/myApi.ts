/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface SignupCredentialsDto {
    /**
     * @min 4
     * @max 20
     */
    username: string;
    /**
     * At least 1 capital, 1 small, 1 special character and 1 number
     * @min 6
     * @max 20
     */
    password: string;
}

export interface SignInCredentialsDto {
    /**
     * @min 4
     * @max 20
     */
    username: string;
    /**
     * At least 1 capital, 1 small, 1 special character and 1 number
     * @min 6
     * @max 20
     */
    password: string;
}

export interface RefreshTokenDto {
    refresh_token: string;
}

export interface ArticleDto {
    /**
     * @min 4
     * @max 30
     */
    title: string;
    /**
     * @min 4
     * @max 150
     */
    description: string;
    body: string;
}

export interface UserInfoDto {
    photo?: {
        /** @format binary */
        file?: File;
    };
    modified_photo?: string;
}

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from 'axios';

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, 'data' | 'params' | 'url' | 'responseType'> {
    /** set parameter to `true` for call `securityWorker` for this request */
    secure?: boolean;
    /** request path */
    path: string;
    /** content type of request body */
    type?: ContentType;
    /** query params */
    query?: QueryParamsType;
    /** format of response (i.e. response.json() -> format: "json") */
    format?: ResponseType;
    /** request body */
    body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, 'data' | 'cancelToken'> {
    securityWorker?: (
        securityData: SecurityDataType | null,
    ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
    secure?: boolean;
    format?: ResponseType;
}

export enum ContentType {
    Json = 'application/json',
    FormData = 'multipart/form-data',
    UrlEncoded = 'application/x-www-form-urlencoded',
    Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
    public instance: AxiosInstance;
    private securityData: SecurityDataType | null = null;
    private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
    private secure?: boolean;
    private format?: ResponseType;

    constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
        this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || '' });
        this.secure = secure;
        this.format = format;
        this.securityWorker = securityWorker;
    }

    public setSecurityData = (data: SecurityDataType | null) => {
        this.securityData = data;
    };

    protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
        const method = params1.method || (params2 && params2.method);

        return {
            ...this.instance.defaults,
            ...params1,
            ...(params2 || {}),
            headers: {
                ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
                ...(params1.headers || {}),
                ...((params2 && params2.headers) || {}),
            },
        };
    }

    protected stringifyFormItem(formItem: unknown) {
        if (typeof formItem === 'object' && formItem !== null) {
            return JSON.stringify(formItem);
        } else {
            return `${formItem}`;
        }
    }

    protected createFormData(input: Record<string, unknown>): FormData {
        return Object.keys(input || {}).reduce((formData, key) => {
            const property = input[key];
            const propertyContent: any[] = property instanceof Array ? property : [property];

            for (const formItem of propertyContent) {
                const isFileType = formItem instanceof Blob || formItem instanceof File;
                formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
            }

            return formData;
        }, new FormData());
    }

    public request = async <T = any, _E = any>({
        secure,
        path,
        type,
        query,
        format,
        body,
        ...params
    }: FullRequestParams): Promise<AxiosResponse<T>> => {
        const secureParams =
            ((typeof secure === 'boolean' ? secure : this.secure) &&
                this.securityWorker &&
                (await this.securityWorker(this.securityData))) ||
            {};
        const requestParams = this.mergeRequestParams(params, secureParams);
        const responseFormat = format || this.format || undefined;

        if (type === ContentType.FormData && body && body !== null && typeof body === 'object') {
            body = this.createFormData(body as Record<string, unknown>);
        }

        if (type === ContentType.Text && body && body !== null && typeof body !== 'string') {
            body = JSON.stringify(body);
        }

        return this.instance.request({
            ...requestParams,
            headers: {
                ...(requestParams.headers || {}),
                ...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {}),
            },
            params: query,
            responseType: responseFormat,
            data: body,
            url: path,
        });
    };
}

/**
 * @title Articlex
 * @version 1.0
 * @contact
 *
 * The Articlex API description
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    api = {
        /**
         * No description
         *
         * @tags Auth
         * @name AuthControllerSignUp
         * @request POST:/api/auth/signup
         */
        authControllerSignUp: (data: SignupCredentialsDto, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/auth/signup`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Auth
         * @name AuthControllerSignIn
         * @request POST:/api/auth/signin
         */
        authControllerSignIn: (data: SignInCredentialsDto, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/auth/signin`,
                method: 'POST',
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Auth
         * @name AuthControllerLogout
         * @request GET:/api/auth/logout
         * @secure
         */
        authControllerLogout: (params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/auth/logout`,
                method: 'GET',
                secure: true,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Auth
         * @name AuthControllerRefreshTokens
         * @request POST:/api/auth/refresh-tokens
         * @secure
         */
        authControllerRefreshTokens: (data: RefreshTokenDto, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/auth/refresh-tokens`,
                method: 'POST',
                body: data,
                secure: true,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Article
         * @name ArticleControllerGetAllArticles
         * @request GET:/api/article/my
         * @secure
         */
        articleControllerGetAllArticles: (params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/article/my`,
                method: 'GET',
                secure: true,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Article
         * @name ArticleControllerCreateArticle
         * @request POST:/api/article
         * @secure
         */
        articleControllerCreateArticle: (data: ArticleDto, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/article`,
                method: 'POST',
                body: data,
                secure: true,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Article
         * @name ArticleControllerGetArticleById
         * @request GET:/api/article/{id}
         * @secure
         */
        articleControllerGetArticleById: (id: number, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/article/${id}`,
                method: 'GET',
                secure: true,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Article
         * @name ArticleControllerUpdateArticleById
         * @request PATCH:/api/article/{id}
         * @secure
         */
        articleControllerUpdateArticleById: (id: number, data: ArticleDto, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/article/${id}`,
                method: 'PATCH',
                body: data,
                secure: true,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags Article
         * @name ArticleControllerDeleteArticleById
         * @request DELETE:/api/article/{id}
         * @secure
         */
        articleControllerDeleteArticleById: (id: number, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/article/${id}`,
                method: 'DELETE',
                secure: true,
                ...params,
            }),

        /**
         * No description
         *
         * @tags User
         * @name UserControllerGetUserInfo
         * @request GET:/api/user
         * @secure
         */
        userControllerGetUserInfo: (params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/user`,
                method: 'GET',
                secure: true,
                ...params,
            }),

        /**
         * No description
         *
         * @tags User
         * @name UserControllerUpdateUserInfo
         * @request PATCH:/api/user
         * @secure
         */
        userControllerUpdateUserInfo: (data: UserInfoDto, params: RequestParams = {}) =>
            this.request<void, any>({
                path: `/api/user`,
                method: 'PATCH',
                body: data,
                secure: true,
                type: ContentType.FormData,
                ...params,
            }),
    };
}
