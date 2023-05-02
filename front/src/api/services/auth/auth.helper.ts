import Cookies from 'js-cookie';
import { Tokens } from 'src/api/contracts';

export function saveTokens(tokens: Tokens) {
    Cookies.set('accessToken', tokens.accessToken);
    Cookies.set('refreshToken', tokens.refreshToken);
}

export function clearTokens() {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
}
