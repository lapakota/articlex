import Cookies from 'js-cookie';
import { Tokens, SignInCredentialsDto, SignInResponseDto, SignUpCredentialsDto } from '../../contracts';
import axiosWithAuth, { axiosBasic } from '../../interceptors';
import { clearTokens, saveTokens } from './auth.helper';

export const AuthService = {
    async signup(data: SignUpCredentialsDto) {
        return axiosBasic.post<void>('auth/signup', data);
    },

    async signin(data: SignInCredentialsDto) {
        const response = await axiosBasic.post<SignInResponseDto>('auth/signin', data);

        if (response.data.accessToken)
            saveTokens({ accessToken: response.data.accessToken, refreshToken: response.data.refreshToken });

        return response;
    },

    async logout() {
        const response = await axiosWithAuth.get<void>('auth/logout');

        clearTokens();

        return response;
    },

    async refreshTokens() {
        const refreshToken = Cookies.get('refreshToken') || '';

        const response = await axiosBasic.post<Tokens>('auth/refresh-tokens', {
            // eslint-disable-next-line camelcase
            refresh_token: refreshToken,
        });

        if (response.data.accessToken) saveTokens(response.data);

        return response;
    },
};
