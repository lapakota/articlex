import axios from 'axios';
import Cookies from 'js-cookie';
import { AuthService } from './services/auth/auth.service';
import { clearTokens } from './services/auth/auth.helper';

export const axiosBasic = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const axiosWithAuth = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

axiosWithAuth.interceptors.request.use((config) => {
    const accessToken = Cookies.get('accessToken');

    if (config.headers && accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
});

axiosWithAuth.interceptors.response.use(
    (config) => config,
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && error.config && !error.config._isRetried) {
            originalRequest._isRetried = true;

            try {
                await AuthService.refreshTokens();

                return axiosWithAuth.request(originalRequest);
            } catch (err) {
                clearTokens();
            }
        }

        throw error;
    },
);

export default axiosWithAuth;
