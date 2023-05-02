import Cookies from 'js-cookie';
import {
    RefreshTokensDto,
    Tokens,
    SignInCredentialsDto,
    SignInResponseDto,
    SignUpCredentialsDto,
} from '../../contracts';
import { axiosBasic } from '../../interceptors';
import { clearTokens, saveTokens } from './auth.helper';

export const AuthService = {
    async signup(data: SignUpCredentialsDto) {
        return axiosBasic.post<void>('auth/signup', data);
    },

    async signin(data: SignInCredentialsDto) {
        const response = await axiosBasic.post<SignInResponseDto>('auth/signin', data);

        if (response.data.accessToken) saveTokens(response.data);

        return response;
    },

    async logout() {
        clearTokens();

        return axiosBasic.get<void>('auth/logout');
    },

    async refreshTokens() {
        const refreshToken = Cookies.get('refreshToken') || '';

        return axiosBasic.post<Tokens, Tokens, RefreshTokensDto>('auth/refresh-tokens', {
            // eslint-disable-next-line camelcase
            refresh_token: refreshToken,
        });
    },
};
