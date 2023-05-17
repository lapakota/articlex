import Cookies from 'js-cookie';
import { Tokens } from 'src/api/contracts';

export function saveTokens(tokens: Tokens) {
    Cookies.set('accessToken', tokens.accessToken, { expires: 7 });
    Cookies.set('refreshToken', tokens.refreshToken, { expires: 7 });
}

export function clearTokens() {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
}
